import Elysia from "elysia";
import agent from "./agent";
import auth from "./middleware/auth";
import token from "./token";
import data from "./data";

const api = new Elysia().use(auth).use(agent).use(token).use(data);

export default api;
