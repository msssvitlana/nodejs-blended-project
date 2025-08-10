import { Router } from "express";
import { getAllProductsController } from "../controllers/products.js";

const productsRouter = Router();

productsRouter.get('/products', getAllProductsController);

export default productsRouter;
