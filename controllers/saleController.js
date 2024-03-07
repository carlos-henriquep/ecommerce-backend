import saleService from "../service/saleService.js"


const allSaleOfUser = async(req,res)=>{
    const {id} = req.params
    const {
        errorMessage,
        statusCode,
        value
    } = await saleService.allSaleOfUser(id)

    const sales = errorMessage ? {errorMessage : errorMessage} : value

    return res.status(statusCode).json(sales)
}

const performSale = async(req,res)=>{
    const idUser = "ce7e48e2-e4b0-489e-bc4c-bc454651593c"
    const products = req.body.products
    const {
        errorMessage,
        statusCode,
        value
    } = await saleService.performSale(products, idUser)

    const sale = errorMessage ? {errorMessage: errorMessage} : {sale: value}

    return res.status(statusCode).json(sale)
}

const saleController = {allSaleOfUser, performSale}

export default saleController