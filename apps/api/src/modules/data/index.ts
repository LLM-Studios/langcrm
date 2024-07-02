import { logger } from "$lib/logger";
import schema from "$modules/schema";
import { extractKeyData } from "$modules/schema/extract-key-data";

const ingest = async (
  workspaceId: string,
  distinctId: string,
  input: string,
) => {
  const keys = await schema.searchRelevantKeys(workspaceId, input);

  const currentData = await schema.getValues(
    workspaceId,
    distinctId,
    keys.map((k) => k.id),
  );

  const getCurrentValue = (key: string) => {
    const value = currentData.find((k) => k.id === key);
    return value?.values[0]?.value;
  };

  const ingestedData = await Promise.all(
    keys.map(
      (k) =>
        new Promise(async (resolve, reject) => {
          const newValue = await extractKeyData(
            input,
            k,
            getCurrentValue(k.id),
          ).catch((e) => {
            logger.error(e);
          });

          if (newValue) {
            resolve(
              await schema.updateValue(workspaceId, distinctId, k.id, newValue),
            );
          }

          resolve({
            key: k.id,
            value: null,
          });
        }),
    ),
  );

  return ingestedData;
};

export default {
  ingest,
};
