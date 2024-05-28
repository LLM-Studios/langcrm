import { App } from "$plugins/index";
import prisma from "@repo/database/prisma";
import { t } from "elysia";

const route = (app: App) =>
  app
    .get("/schema", async ({ store }) => {
      const data = await prisma.key.findMany({
        where: {
          workspaceId: store.token.workspaceId,
        },
      });

      return data;
    })
    .post(
      "/schema",
      async ({ body, store }) => {
        const { name, description, type, priority, tags } = body;
        const data = await prisma.key.create({
          data: {
            id: name,
            workspaceId: store.token.workspaceId,
            description,
            type,
            priority,
            tags,
          },
        });
        return data;
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
            }),
          ),
          tags: t.Optional(t.Array(t.String())),
        }),
      },
    );

export default route;
