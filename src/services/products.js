import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async () => {
  const products = await ProductModel.find();

  return products;
};

export const getProductbyId = async (productId) => {
  const product = await ProductModel.findById(productId);

  return product;
};
