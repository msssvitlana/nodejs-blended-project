import { Router } from 'express';
import {
  createProductController,
  getAllProductsController,
  getProductbyIdController,
} from '../controllers/products.js';

const productsRouter = Router();

productsRouter.get('/products', getAllProductsController);

productsRouter.get('/products/:productId', getProductbyIdController);

productsRouter.post('/products', createProductController);
export default productsRouter;
