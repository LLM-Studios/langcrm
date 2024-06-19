import Elysia from "elysia";
import agent from "./ingest";
import auth from "./middleware/auth";
import token from "./token";
import data from "./data";
import schema from "./schema";

const api = new Elysia().group("/api", (app) =>
  app.use(auth).use(agent).use(token).use(data).use(schema),
);

export default api;
