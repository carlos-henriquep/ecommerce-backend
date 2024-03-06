import connection from "../config/pgConnect.js";
import productModel from "./productModel.js";
import format from "pg-format";

const allSaleOfUser = async (id) => {
  const sales = await connection.query(
    `select p.id as productId, p.name as productName, p.image as image, i.unique_price as priceUnit, s.status as status, i.quantity as quantity, c.name as category, i.unique_price * i.quantity AS totalPrice 
       from sale s inner join itens i on s.id = i.id_sale
       inner join product p on p.id = i.id_product
       inner join category c on p.id_category = c.id 
       where s.id_user = $1;`,
    [id]
  );

  return sales.rows;
};

const performSale1 = async (idSale, idUser) => {
  const sale = await connection.query(
    "INSERT INTO sale(id,status,id_user) values($1,'Finalizado', $2) RETURNING id",
    [idSale, idUser]
  );

  return sale.rows;
};

const saleItens = async (idSale, idProduct, quantity, unique_price) => {
  const client = await connection.connect();

  try {
    await client.query("BEGIN TRANSACTION");
    const itens = await client.query("INSERT INTO itens(id_sale, id_product,quantity,unique_price) values($1,$2,$3,$4)",[idSale, idProduct, quantity, unique_price])
    await client.query("COMMIT");
    
  } catch (error) {
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
};

const performSale = async( saleItens) =>{
  const client = await connection.connect()

  const productId = saleItens.map(product => product.id )
  const products = await productModel.findProductByIds(productId, client)

  const idIncorrect = productId.filter(product => products.some(item => item.id !== product))

  
  console.log(products)

  if(productId.length !== products.length){
    const errorMessage = `Product not found with id: ${idIncorrect.toString()}`
    return {
      errorMessage: errorMessage,
      value: idIncorrect
    }
  }


}

const saleModel = { allSaleOfUser, performSale, saleItens };

export default saleModel;