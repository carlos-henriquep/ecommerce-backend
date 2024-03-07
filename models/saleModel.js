import connection from "../config/pgConnect.js";
import saleValidation from "../service/utils/saleValidations.js";
import productModel from "./productModel.js";
import format from "pg-format";

const allSaleOfUser = async (id) => {
  const sales = await connection.query(
    `select p.id as productId, p.name as productName, p.image as image, i.unique_price as priceUnit,
       s.status as status, s.date as date, i.quantity as quantity, c.name as category, i.unique_price * i.quantity AS totalPrice 
       from sale s inner join itens i on s.id = i.id_sale
       inner join product p on p.id = i.id_product
       inner join category c on p.id_category = c.id 
       where s.id_user = $1 ORDER BY date DESC;`,
    [id]
  );

  return sales.rows;
};

const performSale = async (saleItens, idUser) => {
  const client = await connection.connect();

  const productId = saleItens.map((product) => product.id_product);
  const foundProducts = await productModel.findProductByIds(productId, client);

  const validations = saleValidation(saleItens, productId, foundProducts)
 
  if(validations.errorMessage){
    return{
      errorMessage: validations.errorMessage,
      value: null
    }
  }

  try {
    
    const saleId = await client.query(
      "INSERT INTO sale(status,id_user) values('Finalizado', $1) RETURNING id",
      [idUser]
    );

   

    const itensToSale = saleItens.map((item) => [
      saleId.rows[0].id,
      item.id_product,
      item.quantity,
      item.unique_price,
    ]);

    const finishSaleQuery = format(
      "INSERT INTO itens(id_sale, id_product, quantity, unique_price) values %L",
      itensToSale
    );

    await client.query(finishSaleQuery);

    return {
      errorMessage: null,
      value: saleId.rows[0].id,
    };
  } catch (error) {
    await client.query("ROLLBACK")
    return {
      errorMessage: error.message,
      value: null
    }
  }finally{
    client.release()
  }
};

const saleModel = { allSaleOfUser, performSale };

export default saleModel;
