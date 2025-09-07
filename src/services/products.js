import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async (filter) => {
  const productsQuery = ProductModel.find({ userId: filter.userId });
  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }
  if (filter.minPrice) {
    productsQuery.where('price').gte(filter.minPrice);
  }
  if (filter.maxPrice) {
    productsQuery.where('price').lte(filter.maxPrice);
  }
  return productsQuery;
};

export const getProductbyId = async (productId) => {
  const product = await ProductModel.findById(productId);

  return product;
};

export const createProduct = async (newProduct) => {
  const product = await ProductModel.create(newProduct);
  return product;
};

export const patchProduct = async (productIdes, payload) => {
  const product = await ProductModel.findOneAndUpdate(productIdes, payload, {
    new: true,
  });

  return product;
};

export const deleteProductById = async (productId) => {
  const product = await ProductModel.findOneAndDelete(productId);

  return product;
};
