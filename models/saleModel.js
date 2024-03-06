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

const saleModel = { allSaleOfUser };

export default saleModel;
