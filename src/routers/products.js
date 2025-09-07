import { Router } from 'express';
import {
  createProductController,
  deleteProductByIdController,
  getAllProductsController,
  getProductbyIdController,
  patchProductController,
} from '../controllers/products.js';
import { validateBody } from '../middlewares/validateBody.js';

import { isValidId } from '../middlewares/isValidId.js';
import { checkPermissionsToInteractWithproduct } from '../middlewares/products.js';
import {
  createValidationSchema,
  patchValidationSchema,
} from '../validation/products.js';
import { authenticate } from '../middlewares/authenticate.js';

const productsRouter = Router();
productsRouter.use('/', authenticate);
productsRouter.use(
  '/:productId',
  isValidId,
  checkPermissionsToInteractWithproduct,
);

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
