import { App } from "$plugins/index";
import prisma from "@repo/database/prisma";

const anonRoutes = ["/token"];

const auth = (app: App) => app.onBeforeHandle(async ({ bearer, jwt, logger, store, path }) => {
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
    if (anonRoutes.some(route => path.startsWith(route))) {
        return;
    }
    const token = await prisma.token.findUnique({
        where: {
            value: bearer
        }
    });
    if (!token) {
        logger.error("Token not found");
        return Response.json({
            message: "Token not found"
        }, {
            status: 401,
            statusText: "Unauthorized"
        });
    }
    store.token = token;
});

export default auth;