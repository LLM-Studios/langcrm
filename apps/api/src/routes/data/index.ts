import { App } from "$plugins/index";
import prisma from "@repo/database/prisma";

const route = (app: App) =>
  app
    .get("/data", async ({ store }) => {
      const data = await prisma.value.findMany({
        where: {
          workspaceId: store.token.workspaceId,
        },
      });

      return data;
    })
    .get("/data/:id", async ({ params, store }) => {
      const data = await prisma.value.findMany({
        where: {
          workspaceId: store.token.workspaceId,
          distinctId: params.id,
        },
      });

      return data;
    });

export default route;
