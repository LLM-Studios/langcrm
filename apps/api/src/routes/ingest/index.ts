import { t } from "elysia";
import agent from "./agent";
import { App } from "$plugins/index";
import prisma from "@repo/database/prisma";

const route = (app: App) =>
  app.post(
    "/ingest",
    async ({ body, logger, store }) => {
      const { input, distinctId } = body;
      agent.metadata = {
        distinctId: distinctId,
        workspaceId: store.token.workspaceId,
        userId: store.token.userId,
      };
      const keys = await prisma.key.findMany({
        where: {
          workspaceId: store.token.workspaceId,
        },
      }).then((keys) => {
        const ids = keys.map((key) => key.id);
        logger.debug({ ids });
        return ids;
      });
      const output = await agent.invoke({
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
        prompt_extra: `These keys already exist, they can only be used for updating, not for extending the schema: ${keys.join(", ")}.`,
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
    },
  );

export default route;
