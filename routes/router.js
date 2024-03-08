import express from "express";
import productController from "../controllers/productController.js"
import userController from "../controllers/userController.js";
import saleController from "../controllers/saleController.js";
const router = express.Router()


router.get('/api/products', productController.list)
router.get('/api/products/:id', productController.findOneProduct)
router.post('/api/login', userController.userLogin)
router.post('/api/signup', userController.userRegister)
router.get('/api/sale/', userController.authentication , saleController.allSaleOfUser)
router.post('/api/sale', userController.authentication ,saleController.performSale)


export default router;