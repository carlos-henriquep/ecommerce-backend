import userService from "../service/userService.js";


const userLogin = async(req, res)=>{
    const {email, password} = req.body

    const{
        errorMessage,
        statusCode,
        value
    } = await userService.userLogin(email, password)

    const credentials = errorMessage ? {errorMessage: errorMessage} : value

    return res.status(statusCode).json(credentials)
}

const userController = {userLogin}

export default userController