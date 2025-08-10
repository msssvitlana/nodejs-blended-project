import { Router } from 'express';
import {
  getAllProductsController,
  getProductbyIdController,
} from '../controllers/products.js';

const productsRouter = Router();

productsRouter.get('/products', getAllProductsController);

productsRouter.get('/products/:productId', getProductbyIdController);
export default productsRouter;
