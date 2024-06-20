import schema from "$modules/schema";
import { App } from "$plugins/index";

const route = (app: App) =>
	app
		.get("/data", async ({ store }) => {
			const data = await schema.getData(store.token.workspaceId);
			return data;
		})
		.get("/data/:id", async ({ params, store }) => {
			const data = await schema.getData(store.token.workspaceId, params.id);
			return data;
		})
		.delete("/data/:id", async ({ params, store }) => {
			const data = await schema.deleteData(store.token.workspaceId, params.id);

			return data;
		});

export default route;
