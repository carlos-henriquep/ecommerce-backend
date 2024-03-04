import productService from "../service/productService.js";

const list = async (req, res) => {
  const { errorMessage, statusCode, value } =
    await productService.listProducts();

  const products = errorMessage ? { errorMessage: errorMessage } : value;
  return res.status(statusCode).json(products);
};

const findOneProduct = async (req, res) => {
  const { errorMessage, statusCode, value } =
    await productService.findOneProduct(req.params.id);

  const product = errorMessage ? { errorMessage: errorMessage } : value;
  return res.status(statusCode).json(product);
};

const productController = { list, findOneProduct };
export default productController;
