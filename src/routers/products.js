import { Router } from 'express';
import {
  createProductController,
  deleteProductByIdController,
  getAllProductsController,
  getProductbyIdController,
  patchProductController,
} from '../controllers/products.js';

const productsRouter = Router();

productsRouter.get('/products', getAllProductsController);

productsRouter.get('/products/:productId', getProductbyIdController);

productsRouter.post('/products', createProductController);
productsRouter.patch('/products/:productId', patchProductController);

productsRouter.delete('/products/:productId', deleteProductByIdController);

export default productsRouter;
