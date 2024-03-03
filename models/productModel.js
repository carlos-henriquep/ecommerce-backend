import connection from "../config/pgConnect.js";

const listProducts = async() =>{
    const products = await connection.query('SELECT * FROM PRODUCT')

    return products.rows
}

const findOneProduct = async(productId) =>{
    const product = await connection.query('SELECT * FROM PRODUCT WHERE id = $1', [productId])
    return product.rows
}


const productModel = {listProducts, findOneProduct}


export default productModel;