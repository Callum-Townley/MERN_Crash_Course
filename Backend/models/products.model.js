import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true //gives each object a created at and updated at value
});

const Product = mongoose.model("Product", productSchema);
//you do not put products in here, as mongoose will automatically look for the plural version of the model name
export default Product;