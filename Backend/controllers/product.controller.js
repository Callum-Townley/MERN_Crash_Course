import Product from "../models/products.model.js";
import mongoose from "mongoose";
export const getProducts = async (req,res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data:products})
    } catch (error) {
        console.error("error in getting products",error.message)
        res.status(500).json({success:false, message:"internal server error"})
        
    }
}
export const createProduct = async (req,res) =>{
    const product = req.body; // user will send the data
    if(!product.name|| !product.price || !product.image){
        return res.status(400).json({success:false, message:"please provide all fields"})
        //error 400 means the client has made a bad request
        
    }
    const newProduct = new Product(product);
    //newProduct is an instance of the Product model
    try {
        await newProduct.save();
        res.status(201).json({success:true, data:product})
    } catch (error) {
        console.error("error in Creating Product",error.message)
        res.status(400).json({success:false, message:"invalid request"})
    }
}
export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"invalid product id"})
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"product deleted successfully"})
    } catch (error) {
        console.error("error in deleting product",error.message)
        res.status(500).json({success:false, message:"internal server error,no product deleted"})
        
    }
}
export const updateProduct =  async (req,res) =>{
    const {id} = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"invalid product id"})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true, data:updatedProduct})
    } catch (error) {
        console.error("error in updating product",error.message)
        res.status(500).json({success:false, message:"internal server error"})
        
    }
}