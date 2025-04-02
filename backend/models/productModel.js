import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    Shortdescription:{type:String,required:true},
    description:{type:String,required:true},
    actualprice:{type:Number,required:true},
    discountedprice:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    date:{type:Number,required:true},
    offer: { type: Number, required: true },
})

const productModel= mongoose.models.product ||  mongoose.model('product',productSchema);
export default productModel