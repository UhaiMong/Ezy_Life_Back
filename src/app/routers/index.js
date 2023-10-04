import express from "express";
import { UserRoutes } from "../modules/users/user.route.js";
import { BikeRentRoutes } from "../modules/bike-rent/bike.route.js";
import { ParcelRoutes } from "../modules/parcel/parcel.route.js";
import { BlogRoutes } from "../modules/blog/blog.route.js";
import { MedicineRoutes } from "../modules/medicine/medicine.route.js";

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
    path: "/parcel",
    route: ParcelRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/medicine",
    route: MedicineRoutes,
  },
];

routerModule.forEach((route) => routers.use(route.path, route.route));

export default routers;
