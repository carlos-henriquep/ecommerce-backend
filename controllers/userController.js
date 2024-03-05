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

const userRegister = async(req, res)=>{
    const {username, email, password} = req.body

    const {
        errorMessage,
        statusCode,
        value
    } = await userService.userRegister(username, email, password)

    const newCredentials = errorMessage ? {errorMessage: errorMessage} : {message: value}
    return res.status(statusCode).json(newCredentials)

}

const userController = {userLogin, userRegister}

export default userController