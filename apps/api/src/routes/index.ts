import Elysia from "elysia";
import auth from "./middleware/auth";
import token from "./token";
import data from "./data";
import schema from "./schema";

const api = new Elysia().group("/api", (app) =>
	app.use(auth).use(token).use(data).use(schema)
);

export default api;
