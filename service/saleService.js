import saleModel from "../models/saleModel.js";

const allSaleOfUser = async (id) => {
  try {
    const allSale = await saleModel.allSaleOfUser(id);

    if (allSale.length === 0) {
      return {
        errorMessage: null,
        statusCode: 200,
        value: [],
      };
    }

    return {
      errorMessage: null,
      statusCode: 200,
      value: allSale,
    };
  } catch (error) {
    return {
      errorMessage: error.message,
      statusCode: 400,
      value: null,
    };
  }
};

const performSale = async (sales, idUser) => {
  try {
    const teste = await saleModel.performSale(sales, idUser);

    if(teste.errorMessage){
        throw new Error(teste.errorMessage)
    }

    return {
      errorMessage: null,
      statusCode: 201,
      value: teste.value,
    };
  } catch (error) {
    return {
        errorMessage: error.message,
        statusCode: 400,
        value: null
    }
  }
};
const saleService = { allSaleOfUser, performSale };

export default saleService;
