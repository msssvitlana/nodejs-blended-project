import createHttpError from 'http-errors';
import { ProductModel } from '../db/models/product.js';

export const checkPermissionsToInteractWithproduct = async (req, res, next) => {
  const product = await ProductModel.findById(req.params.productId);

  if (!product?.userId?.equals(req.user._id))
    throw createHttpError(
      403,
      'You do not have permission to access this contact',
    );

  next();
};
