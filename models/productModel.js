import format from "pg-format";
import connection from "../config/pgConnect.js";

const listProducts = async() =>{
    const products = await connection.query('SELECT p.id, p.name, p.description, p.image, p.price, p.stock, c.name as category_name FROM PRODUCT as p INNER JOIN Category as c on c.id = p.id_category ')

    return products.rows
}

const findOneProduct = async(productId) =>{
    const product = await connection.query('SELECT * FROM PRODUCT WHERE id = $1', [productId])
    
    return product.rows
}

const findProductByIds = async(productIds, connect) =>{

    const query = format('SELECT id, name, CAST(price AS float), stock from PRODUCT WHERE id IN (%L)', productIds)

    const products = await connect.query(query)

    return products.rows
}


const productModel = {listProducts, findOneProduct, findProductByIds}


export default productModel;