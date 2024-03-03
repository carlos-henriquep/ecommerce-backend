import productModel from "../models/productModel.js";

const listProducts = async () => {
  const products = await productModel.listProducts();
  return {
    errorMessage: null,
    statusCode: 200,
    value: products,
  };
};

const findOneProduct = async (productId) => {
  try {
    const product = await productModel.findOneProduct(productId);
    return {
      errorMessage: null,
      statusCode: 200,
      value: product,
    };
  } catch (error) {
    return {
        errorMessage: error.message,
        statusCode: 404,
        value: null,
      };
  }
};

const productService = { listProducts, findOneProduct };
export default productService;
