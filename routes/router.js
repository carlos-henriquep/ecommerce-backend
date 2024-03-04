import express from "express";
import productController from "../controllers/productController.js"
import userController from "../controllers/userController.js";
const router = express.Router()


router.get('/api/products', productController.list)
router.get('/api/products/:id', productController.findOneProduct)
router.post('/api/login', userController.userLogin)


export default router;