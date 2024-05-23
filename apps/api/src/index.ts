import { Elysia } from "elysia";
import plugins from "./plugins";
import api from "./routes";

export const app = new Elysia()
  .use(plugins)
  .use(api)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
