import schema from "$modules/schema";
import { App } from "$plugins/index";
import { t } from "elysia";
import ingest from "./ingest";

const route = (app: App) =>
	app
		.get(
			"/data",
			async ({ store, query: { search, distinctId, keys } }) => {
				let searchKeys;
				if (search) {
					searchKeys = await schema.searchKeys(store.token.workspaceId, search);
				}

				const queryKeys = keys
					? keys
					: searchKeys
						? searchKeys?.map((key) => key.id)
						: undefined;
				const data = await schema.getData(
					store.token.workspaceId,
					distinctId,
					queryKeys
				);
				return data;
			},
			{
				query: t.Object({
					search: t.Optional(
						t.String({
							description:
								"Specify a search query to search for keys that relate to the query",
						})
					),
					distinctId: t.Optional(
						t.String({
							description: "The distinctId to search for",
						})
					),
					keys: t.Optional(
						t.Array(
							t.String({
								description: "Retrieve data for specific keys only",
							})
						)
					),
				}),
				detail: {
					tags: ["data"],
					operationId: "getData",
					summary: "Get data",
					description:
						"Retrieve data from the key value store. Use the `search` query parameter to retrieve data based on keys matching the search query. Use the `distinctId` query parameter to retrieve data for a specific distinctId. Use the `keys` query parameter to retrieve data for specific keys.",
				},
			}
		)
		.delete(
			"/data",
			async ({ store, query }) => {
				const data = await schema.deleteData(
					store.token.workspaceId,
					query.distinctId
				);

				return data;
			},
			{
				query: t.Object({
					keys: t.Array(
						t.String({
							description: "The keys to delete",
						})
					),
					distinctId: t.String({
						description: "The distinctId to delete data for",
					}),
				}),
				detail: {
					tags: ["data"],
					operationId: "deleteData",
					summary: "Delete data",
					description:
						"Delete data related to a distinctId. Use the `keys` query parameter to specify which keys to delete.",
				},
			}
		)
		.post(
			"/data/ingest",
			async ({ body, store }) => {
				const { input, distinctId } = body;

				const response = await ingest({
					input,
					workspaceId: store.token.workspaceId,
					distinctId: distinctId,
					userId: store.token.userId,
				});

				return response;
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
			}
		);

export default route;
