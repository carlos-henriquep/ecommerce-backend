import connection from "../config/pgConnect.js";

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

const performSale = async (idSale, idUser) => {
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
    return{
      errorMessage: null,
      value: itens
    }
  } catch (error) {
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
};

const saleModel = { allSaleOfUser, performSale, saleItens };

export default saleModel;
