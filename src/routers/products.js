import { Router } from 'express';
import {
  createProductController,
  deleteProductByIdController,
  getAllProductsController,
  getProductbyIdController,
  patchProductController,
} from '../controllers/products.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createValidationSchema } from '../validation/createValidationSchema.js';
import { patchValidationSchema } from '../validation/patchValidationSchema.js';
import { isValidId } from '../middlewares/isValidId.js';

const productsRouter = Router();

productsRouter.use('/products/:productId', isValidId);

productsRouter.get('/products', getAllProductsController);

productsRouter.get('/products/:productId', getProductbyIdController);

productsRouter.post(
  '/products',
  validateBody(createValidationSchema),
  createProductController,
);
productsRouter.patch(
  '/products/:productId',
  validateBody(patchValidationSchema),
  patchProductController,
);

productsRouter.delete('/products/:productId', deleteProductByIdController);

export default productsRouter;
