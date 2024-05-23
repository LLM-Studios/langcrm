import { App } from "$plugins/index";

const auth = (app: App) => app.onBeforeHandle(({ bearer, jwt, logger }) => {
    if (!bearer) {
        logger.error("No token provided");
        return Response.json({
            message: "No token provided"
        }, {
            status: 401,
            statusText: "Unauthorized"
        });
    }
    const isValid = jwt.verify(bearer);
    if (!isValid) {
        logger.error("Invalid token");
        return Response.json({
            message: "Invalid token"
        }, {
            status: 401,
            statusText: "Unauthorized"
        });
    }
});

export default auth;