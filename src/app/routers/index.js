import express from "express";
import { UserRoutes } from "../modules/users/user.route.js";
import { BikeRentRoutes } from "../modules/bike-rent/bike.route.js";
import { PercelRoutes } from "../modules/parcel/parcel.route.js";

const routers = express.Router();

const routerModule = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/bike-rent",
    route: BikeRentRoutes,
  },
  {
    path: "/percel",
    route: PercelRoutes,
  },
];

routerModule.forEach((route) => routers.use(route.path, route.route));

export default routers;
