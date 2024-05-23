import { t } from "elysia";
import agent from "./agent";
import { App } from "$plugins/index";
import prisma from "@repo/database/prisma";

const route = (app: App) => app
    .post("/agent", async ({ body, logger }) => {
        const { input, distinctId } = body;
        agent.metadata = {
            distinctId: distinctId
        };
        const keys = await prisma.key.findMany().then(keys => {
          const ids = keys.map(key => key.id);
          logger.debug({ ids });
          return ids;
        });
        const output = await agent.invoke({
          messages: [{
            role: "user",
            content: input,
          }],
          prompt_extra: `These keys already exist, they can only be used for updating, not for extending the schema: ${keys.join(", ")}.`
        });
        return Response.json({
          input,
          output
        });
    }, {
        body: t.Object({
            distinctId: t.String(),
            input: t.String()
        })
    });

export default route;

