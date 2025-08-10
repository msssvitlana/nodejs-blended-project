import createHttpError from 'http-errors';
import { getAllProducts, getProductbyId } from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  const products = await getAllProducts();

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
