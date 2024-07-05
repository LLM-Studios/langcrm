import schema from "$modules/schema";
import { App } from "$plugins/index";
import { t } from "elysia";
import { generateKey } from "$modules/schema/generate-key";
import { extractKeys } from "$modules/schema/extract-keys";
import { stringify } from "yaml";
import { uniqBy } from "lodash";
import { extractKeyValue } from "$modules/data/extract-key-value";
import data from "$modules/data";
import { Key } from "@repo/database/prisma";

const route = (app: App) =>
  app.post(
    "/data/ingest",
    async ({ body, store, logger }) => {
      const { input, distinctId } = body;

      const workspaceId = store.token.workspaceId;

      const extractedKeys = await extractKeys(input);

      logger.debug({ input, extractedKeys });

      let newKeys: { key: string; description: string; value: any }[] = [];

      const existingKeys = uniqBy((
        await Promise.all(
          extractedKeys.map(async (key) => {
              const keys = await schema.searchKeys(workspaceId, key.key);
              if (keys.length === 0) {
                newKeys.push(key);
              }
              return keys;
            },
          ),
        )
          )
            .flat(),
          (key) => key.id,
        );

      logger.debug({ newKeys, existingKeys });

      const generatedKeys = await Promise.all(
        newKeys.map(async (key) => {
          const generatedKey = await generateKey(stringify(key));
          await schema.upsertKey(workspaceId, generatedKey.id, generatedKey);
          return generatedKey;
        }),
      ) as Key[];

      logger.debug({ generatedKeys });

      const currentValues = (await data.getValues(workspaceId, distinctId, existingKeys.map((key) => key.id))).flatMap((v) => v.values);

      logger.debug({ currentValues });

      const [ updatedValues, newValues ] = await Promise.all([
        Promise.all(
          existingKeys.map(async (key) => {
            const currentValue = currentValues.find((v) => v.keyId === key.id)?.value;
            const relevantKeys = await schema.searchKeys(workspaceId, key.id);
            const relevantData = await data.getValues(workspaceId, distinctId, relevantKeys.map((k) => k.id));
            const value = await extractKeyValue({
              input,
              key,
              currentValue,
              relevantData,
            });
            // QA step
            logger.debug({ input, value, currentValue, key, relevantData });
            if (value && value !== currentValue) {
              return await data.updateValue(workspaceId, distinctId, key.id, value);
            }
          }),
        ),
        Promise.all(
          generatedKeys.map(async (key) => {
            const relevantKeys = await schema.searchKeys(workspaceId, key.id);
            const relevantData = await data.getValues(workspaceId, distinctId, relevantKeys.map((k) => k.id));
            const value = await extractKeyValue({
              input,
              key,
              relevantData,
            });
            // QA step
            logger.debug({ input, value, key, relevantData });
            if (value) {
              return await data.updateValue(workspaceId, distinctId, key.id, value);
            }
          }),
        ),
      ]);

      logger.debug({ updatedValues, newValues });

      return {
        input,
        updatedValues: updatedValues.filter((v) => v !== undefined && v !== null),
        newValues: newValues.filter((v) => v !== undefined && v !== null),
      };
    },
    {
      body: t.Object({
        distinctId: t.String({
          description: "The distinctId to relate the data to",
        }),
        input: t.String({
          description: "The input data to ingest.",
        }),
      }),
      detail: {
        tags: ["data"],
        operationId: "ingestData",
        summary: "Ingest data",
        description:
          "Ingest data into the context of a distinctId. The data will be processed to extract relevant information based on the schema and your workspace configuration.",
      },
    },
  );

export default route;
