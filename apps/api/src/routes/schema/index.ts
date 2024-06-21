import schema from "$modules/schema";
import { App } from "$plugins/index";
import { t } from "elysia";

const route = (app: App) =>
	app
		.get(
			"/schema",
			async ({ store, query: { q } }) => {
				if (!q) {
					return await schema.getSchema(store.token.workspaceId);
				}

				return await schema.searchKeys(store.token.workspaceId, q);
			},
			{
				query: t.Object({
					q: t.Optional(t.String()),
				}),
			}
		)
		.get(
			"/schema/:key",
			async ({ store, params: { key } }) =>
				await schema.getKey(store.token.workspaceId, key)
		)
		.post(
			"/schema",
			async ({ body, store }) => {
				const { name, description, priority, tags } = body;
				return await schema.upsertKey({
					id: name,
					description,
					priority,
					tags,
					workspaceId: store.token.workspaceId,
				});
			},
			{
				body: t.Object({
					name: t.String(),
					description: t.String(),
					priority: t.Optional(
						t.Enum({
							REQUIRED: "REQUIRED",
							HIGH: "HIGH",
							MEDIUM: "MEDIUM",
							LOW: "LOW",
							VERY_LOW: "VERY_LOW",
						})
					),
					tags: t.Optional(t.Array(t.String())),
				}),
			}
		);

export default route;
