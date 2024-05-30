import { t } from "elysia";
import agent from "./agent";
import { App } from "$plugins/index";
import prisma from "@repo/database/prisma";

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
      const keys = await prisma.key
        .findMany({
          where: {
            workspaceId: store.token.workspaceId,
          },
          include: {
            values: {
              where: {
                distinctId: distinctId,
              },
            },
          },
        });
      const schema = keys.map((key) => `${key.id} - ${key.description}: ${key.values.map((value) => value.value).join(", ")}`).join("\n");
      const output = await agent.invoke({
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
        prompt_extra: 
        `The following information is already known about the user. 
You can use these keys to update information if it is subject to change based on the given input. 
        
${schema}

If some information about the user is missing, you can use the 'update_schema' tool for keys listed above or the 'extend_schema' tool to add new keys. 
Based on the all of the information on the user you can infer what information is missing and add it to the schema using your tools.`,
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
