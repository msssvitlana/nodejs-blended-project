import { ProductModel } from "../db/models/product.js"

export const getAllProducts = async () => {
    const products = await ProductModel.find();

    return products;
}
