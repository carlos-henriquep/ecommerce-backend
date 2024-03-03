import express from "express";
import productController from "../controllers/productController.js"
const router = express.Router()


router.get('/api/products', productController.list)
router.get('/api/products/:id', productController.findOneProduct)


export default router;