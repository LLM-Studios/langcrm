import schema from "$modules/schema";
import { App } from "$plugins/index";
import { t } from "elysia";

const route = (app: App) =>
	app
		.get(
			"/schema",
			async ({ store }) => await schema.getSchema(store.token.workspaceId)
		)
		.post(
			"/schema",
			async ({ body, store }) => {
				const { name, description, type, priority, tags } = body;
				return await schema.upsertKey({
					id: name,
					description,
					type,
					priority,
					tags,
					workspaceId: store.token.workspaceId,
				});
			},
			{
				body: t.Object({
					name: t.String(),
					description: t.String(),
					type: t.String(),
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
