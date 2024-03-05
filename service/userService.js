import userModel from "../models/userModel.js";
import validations from "./utils/validations.js";

const userLogin = async(userEmail, userPassword) =>{

    const validate = validations.loginUser(userEmail, userPassword)

    if(validate.errorMessage){
        return {
            errorMessage: validate.errorMessage,
            statusCode: 400,
            value: null
        }
    }

    try {

        const emailExists = await userModel.emailAlreadyRegistered(userEmail)
        if(emailExists.length === 0){
            throw new Error("E-mail not already yet registered ")
        }

        const credentials = await userModel.userLogin(userEmail, userPassword)

        if(credentials.length === 0){
            throw new Error("Incorrect email or password")
        }
        
        return{
            errorMessage: null,
            statusCode: 200,
            value:credentials
        }
    } catch (error) {
        return{
            errorMessage: error.message,
            statusCode: 401,
            value: null
        }
    }


}



const userService = {userLogin}

export default userService