import schema from "$modules/schema";
import { App } from "$plugins/index";
import { t } from "elysia";

const route = (app: App) =>
  app
    .get(
      "/data",
      async ({ store, query: { distinctId, search, keys } }) => {
        let searchKeys = keys;
        if (!searchKeys && search) {
          searchKeys = (
            await schema.searchKeys(store.token.workspaceId, search)
          ).map((key) => key.id);
        }

        const data = await schema.getData(
          store.token.workspaceId,
          distinctId,
          searchKeys,
        );

        return data;
      },
      {
        query: t.Object({
          distinctId: t.Optional(
            t.String({
              description: "The distinctId to search for",
            }),
          ),
          search: t.Optional(
            t.String({
              description:
                "Specify a search query to search for keys that relate to the query",
            }),
          ),
          keys: t.Optional(
            t.Array(
              t.String({
                description: "Retrieve data for specific keys only",
              }),
            ),
          ),
        }),
        detail: {
          tags: ["data"],
          operationId: "getData",
          summary: "Get data",
          description:
            "Retrieve data from the key value store. Use the `distinctId` query parameter to retrieve data for a specific distinctId. Use the `search` query parameter to retrieve data based on keys matching the search query. Use the `keys` query parameter to retrieve data for specific keys. Only one of `search`, or `keys` can be used at a time.",
        },
      },
    )
    .delete(
      "/data",
      async ({ store, query: { distinctId, keys } }) => {
        const data = await schema.deleteData(
          store.token.workspaceId,
          distinctId,
          keys,
        );

        return data;
      },
      {
        query: t.Object({
          distinctId: t.String({
            description: "The distinctId to delete data for",
          }),
          keys: t.Optional(
            t.Array(
              t.String({
                description: "The keys to delete",
              }),
            ),
          ),
        }),
        detail: {
          tags: ["data"],
          operationId: "deleteData",
          summary: "Delete data",
          description:
            "Delete data related to a distinctId. Optionally, use the `keys` query parameter to specify which keys to delete.",
        },
      },
    );

export default route;
