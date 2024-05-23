import Elysia, { t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { logger } from '$lib/logger';
import { jwt } from '@elysiajs/jwt';
import { bearer } from '@elysiajs/bearer';

const swaggerPlugin = () => new Elysia().use(swagger({
    path: "/docs",
    documentation: {
        info: {
            title: "LangCRM API",
            version: "1.0.0"
        }
    }
}));

const loggerPlugin = new Elysia().decorate('logger', logger)
    .onRequest(({ request, logger }) => {
        logger.info({
            method: request.method,
            url: request.url
        });
    })
    .onResponse(({ request, set, logger }) => {
		logger.info({
			method: request.method,
			url: request.url,
			status: set.status
		});
	})
    .onError(({ code, error, logger }) => {
        logger.error({
            code,
            error
        });
        return Response.json({
            error: "Internal server error"
        }, {
            status: 500
        })
    });

const jwtPlugin = new Elysia()
    .state({ user: {} as {} | null })
    .use(bearer())
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET ?? 'secret',
        schema: t.Object({
            id: t.String(),
            createdAt: t.String()
        })
    }));

const plugins = new Elysia()
    .use(swaggerPlugin)
    .use(loggerPlugin)
    .use(jwtPlugin);

export type App = typeof plugins;

export default () => plugins;

