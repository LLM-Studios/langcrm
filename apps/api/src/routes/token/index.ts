import { App } from "$plugins/index";

const route = (app: App) =>
  app.get(
    "/token/:id",
    async ({ jwt, params, logger }) => {
      const { id } = params;
      const token = await jwt.sign({
        id: id,
        createdAt: new Date().toISOString(),
      });
      logger.debug({ token });
      return Response.json({
        token,
      });
    },
    {
      detail: {
        tags: ["config"],
        operationId: "getToken",
        summary: "Get token",
        description: "Generate a API token",
      },
    },
  );

export default route;
