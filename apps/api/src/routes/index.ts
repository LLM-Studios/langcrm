import Elysia from "elysia";
import auth from "./middleware/auth";
import token from "./token";
import data from "./data";
import schema from "./schema";
import ingest from "./data/ingest";

const api = new Elysia().group("/api", (app) =>
  app.use(auth).use(token).use(data).use(schema).use(ingest),
);

export default api;
