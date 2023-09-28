import express from "express";
import { UserRoutes } from "../modules/users/user.route.js";

const routers = express.Router();

const routerModule = [
  {
    path: "/users",
    route: UserRoutes,
  },
];

routerModule.forEach((route) => routers.use(route.path, route.route));

export default routers;
