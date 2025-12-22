import { Application } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.routes";
import productRoute from "./product.route";
import categoryRoute from "./category.route";
import reviewRoute from "./review.route";



const clientRoute = (app: Application) => {
  const path = "/api";
  app.use(path + "/user", userRoute);
  app.use(path + "/product", productRoute);
  app.use(path + "/category", categoryRoute);
  app.use(path + "/review", reviewRoute);
  app.use(path, authRoute);
};

export default clientRoute;
