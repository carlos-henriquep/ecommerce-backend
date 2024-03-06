import userModel from "../models/userModel.js";
import passwordEncryptor from "./utils/passwordEncryptor.js";
import validations from "./utils/validations.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY

const userLogin = async (userEmail, userPassword) => {
  const validate = validations.loginUser(userEmail, userPassword);

  if (validate.errorMessage) {
    return {
      errorMessage: validate.errorMessage,
      statusCode: 400,
      value: null,
    };
  }

  try {
    const credentials = await userModel.userLogin(userEmail);

    if (credentials.length === 0) {
      throw new Error("Incorrect email or password ");
    }
    const passwordVerify = await passwordEncryptor.decryptPassword(
      userPassword,
      credentials[0].password
    );

    if (!passwordVerify) {
      throw new Error("Incorrect email or password ");
    }
    const token = jwt.sign({id: credentials[0].id, username: credentials[0].id}, SECRET_KEY)

    return {
      errorMessage: null,
      statusCode: 200,
      value: {token, credentials},
    };
  } catch (error) {
    return {
      errorMessage: error.message,
      statusCode: 401,
      value: null,
    };
  }
};

const userRegister = async ( username, email, password ) => {

  const validate = validations.userRegister(username, email, password);
  if (validate.errorMessage) {
    return {
      errorMessage: validate.errorMessage,
      statusCode: 400,
      value: null,
    };
  }

  try {
    const existsEmail = await userModel.userLogin(email)
    if(existsEmail.length > 0){
       throw new Error("Email already registered")
    }
    const id = uuid();
    const hashedPassword = await passwordEncryptor.encryptPassword(password)
    const credentials = await userModel.userRegister( id, username, email, hashedPassword )
    
    if(credentials.errorMessage){
        throw new Error(credentials.errorMessage)
    }
    return{
        errorMessage: null,
        statusCode: 201,
        value: credentials.value
    }
  } catch (error) {
    return {
        errorMessage: error.message,
        statusCode: 422,
        value: null
    }
  }
};

const userService = { userLogin, userRegister };

export default userService;
