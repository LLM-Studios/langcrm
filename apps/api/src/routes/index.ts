import Elysia from "elysia";
import agent from "./agent";
import auth from "./middleware/auth";
import token from "./token";

const api = new Elysia()
    .use(auth)
    .use(agent)
    .use(token);

export default api;

