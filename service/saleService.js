import saleModel from "../models/saleModel.js";


const allSaleOfUser = async(id)=>{

    try {

        const allSale = await saleModel.allSaleOfUser(id)

        if(allSale.length === 0){
            return {
                errorMessage: null,
                statusCode: 200,
                value: []
            }
        }

        return {
            errorMessage: null,
            statusCode: 200,
            value: allSale
        }
        
    } catch (error) {
        return {
            errorMessage:error.message,
            statusCode: 400,
            value: null
        }
    }

}

const performSale = async(sales)=>{
    const teste = await saleModel.performSale(sales)
}
const saleService = {allSaleOfUser, performSale}

export default saleService