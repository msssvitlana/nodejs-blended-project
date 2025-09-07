import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductbyId,
  patchProduct,
} from '../services/products.js';
import { parseFilterParams } from '../utils/parseFiterParams.js';

export const getAllProductsController = async (req, res) => {
  const filter = parseFilterParams(req.query);
  filter.userId = req.user._id;

  const products = await getAllProducts(filter);

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductbyIdController = async (req, res) => {
  const { productId } = req.params;

  const product = await getProductbyId(productId);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const product = await createProduct({ ...req.body, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const patchProductController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await patchProduct(
    {
      _id: productId,
      userId: req.user._id,
    },
    req.body,
  );

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: product,
  });
};

export const deleteProductByIdController = async (req, res) => {
  const { productId } = req.params;

  const product = await deleteProductById({
    _id: productId,
    userId: req.user._id,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(204).send();
};
