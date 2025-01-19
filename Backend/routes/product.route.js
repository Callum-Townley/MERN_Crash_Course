import express from "express";
import mongoose from "mongoose";
import Product from "../models/products.model.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.post("/",createProduct)
//post usually handles creating documents in the database
router.delete("/:id", deleteProduct)
//delete will delete a product by its id
router.get("/", getProducts)
//get will get all products
router.put("/:id",updateProduct)
//put will update a product by its id

export default router;