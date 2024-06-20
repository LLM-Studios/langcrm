import { t } from "elysia";
import agent from "./agent";
import { App } from "$plugins/index";
import schema from "$modules/schema";

const route = (app: App) =>
	app.post(
		"/ingest",
		async ({ body, store }) => {
			const { input, distinctId } = body;
			agent.metadata = {
				distinctId: distinctId,
				workspaceId: store.token.workspaceId,
				userId: store.token.userId,
			};

			const keys = await schema.getValues(store.token.workspaceId, distinctId);

			const schemaDef =
				keys.length > 0
					? keys
							.map(
								(key) =>
									`${key.id} - ${key.description}: ${key.values
										.map((value) => value.value)
										.filter(
											(value, index, array) => array.indexOf(value) === index
										)
										.join(", ")}`
							)
							.join("\n")
					: "Empty - use the 'extend_schema' tool to add a key and value.";
			const output = await agent.invoke({
				messages: [
					{
						role: "user",
						content: input,
					},
				],
				prompt_args: {
					schema: schemaDef,
				},
			});
			return Response.json({
				input,
				output,
			});
		},
		{
			body: t.Object({
				distinctId: t.String(),
				input: t.String(),
			}),
		}
	);

export default route;
