import { logger } from "$lib/logger";
import schema from "$modules/schema";
import { App } from "$plugins/index";
import { KeyType, Priority } from "@prisma/client";
import { t } from "elysia";
import slugify from "slugify";

const route = (app: App) =>
	app
		.get(
			"/schema",
			async ({ store, query: { search, keys } }) => {
				if (keys) {
					return await schema.getSchema(store.token.workspaceId, keys);
				}

				if (search) {
					return await schema.searchKeys(store.token.workspaceId, search);
				}

				return await schema.getSchema(store.token.workspaceId);
			},
			{
				query: t.Object({
					search: t.Optional(t.String()),
					keys: t.Optional(t.Array(t.String())),
				}),
				detail: {
					tags: ["schema"],
					operationId: "getSchema",
					summary: "Get schema",
					description:
						"Get (all) key of the schema. Use the `search` query parameter to search for keys. Use the `keys` query parameter to get specific keys.",
				},
			}
		)
		.get(
			"/schema/:key",
			async ({ store, params: { key } }) =>
				await schema.getKey(store.token.workspaceId, key),
			{
				detail: {
					tags: ["schema"],
					operationId: "getKey",
					summary: "Get key",
					description: "Get a specific key from the schema.",
				},
			}
		)
		.post(
			"/schema",
			async ({ body, store }) => {
				const { id, type, description, priority, tags } = body;

				return await schema.upsertKey(store.token.workspaceId, slugify(id), {
					type,
					description,
					priority,
					tags,
				});
			},
			{
				body: t.Object({
					id: t.String({
						pattern: "^[a-z0-9-.]+$",
					}),
					type: t.Enum(KeyType),
					description: t.String(),
					priority: t.Optional(t.Enum(Priority)),
					tags: t.Optional(t.Array(t.String())),
				}),
				detail: {
					tags: ["schema"],
					operationId: "createKey",
					summary: "Create key",
					description: "Create a new key in the schema.",
				},
			}
		)
		.patch(
			"/schema/:key",
			async ({ body, store, params: { key } }) =>
				await schema.updateKey(store.token.workspaceId, key, body),
			{
				body: t.Object({
					type: t.Optional(t.Enum(KeyType)),
					description: t.Optional(t.String()),
					priority: t.Optional(t.Enum(Priority)),
					tags: t.Optional(t.Array(t.String())),
				}),
				detail: {
					tags: ["schema"],
					operationId: "updateKey",
					summary: "Update key",
					description: "Update a key in the schema.",
				},
			}
		)
		.delete(
			"/schema/:key",
			async ({ store, params: { key } }) =>
				await schema.deleteKey(store.token.workspaceId, key),
			{
				detail: {
					tags: ["schema"],
					operationId: "deleteKey",
					summary: "Delete key",
					description:
						"Delete a key from the schema. This will also delete all values associated with the key.",
				},
			}
		);

export default route;
