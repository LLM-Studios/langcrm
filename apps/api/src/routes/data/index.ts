import schema from "$modules/schema";
import { App } from "$plugins/index";

const route = (app: App) =>
	app
		.get("/data", async ({ store }) => {
			const data = await schema.getData(store.token.workspaceId);
			return data;
		})
		.get("/data/:key", async ({ params, store }) => {
			const data = await schema.getData(store.token.workspaceId, params.key);
			return data;
		})
		.delete("/data/:key", async ({ params, store }) => {
			const data = await schema.deleteData(store.token.workspaceId, params.key);

			return data;
		});

export default route;
