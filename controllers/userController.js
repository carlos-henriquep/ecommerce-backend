import userService from "../service/userService.js";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const { errorMessage, statusCode, value } = await userService.userLogin(
    email,
    password
  );

  const credentials = errorMessage ? { errorMessage: errorMessage } : value;

  return res.status(statusCode).json(credentials);
};

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  const { errorMessage, statusCode, value } = await userService.userRegister(
    username,
    email,
    password
  );

  const newCredentials = errorMessage
    ? { errorMessage: errorMessage }
    : { message: value };
  return res.status(statusCode).json(newCredentials);
};

const authentication = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.includes("Bearer")) {
      throw new Error("invalid token.");
    }

    const token = header.split(" ")[1];

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ errorMessage: error.message });
  }
};

const userController = { userLogin, userRegister, authentication };

export default userController;
