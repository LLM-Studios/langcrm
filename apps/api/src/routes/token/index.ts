import { App } from "$plugins/index";

const route = (app: App) => app
    .get('/token/:id', async ({ jwt, params, logger }) => {
        const { id } = params;
        const token = await jwt.sign({
            id: id,
            createdAt: new Date().toISOString()
        });
        logger.debug({ token });
        return Response.json({
            token
        });
    });

export default route;