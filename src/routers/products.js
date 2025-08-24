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

productsRouter.use('/:productId', isValidId);

productsRouter.get('/', getAllProductsController);

productsRouter.get('/:productId', getProductbyIdController);

productsRouter.post(
  '/',
  validateBody(createValidationSchema),
  createProductController,
);
productsRouter.patch(
  '/:productId',
  validateBody(patchValidationSchema),
  patchProductController,
);

productsRouter.delete('/:productId', deleteProductByIdController);

export default productsRouter;
