import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';

const addProduct=async(req,res)=>{
    try {
        const {name,
             description,
             Shortdescription,
             actualprice,
             discountedprice,
             category,
             offer}=req.body;
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
    const images=[image1,image2].filter((item)=>item !== undefined)
    const imageUrl=await Promise.all(
        images.map(async(item)=>{
     let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
     return result.secure_url
        })
    )

    const productData = {
        name,
        description,
        Shortdescription,
        actualprice,
        discountedprice,
        category,
        offer,
        image:imageUrl,
        date:Date.now()
    }

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}



//Function for list product
const listProducts=async(req,res)=>{
    try {
        const products=await productModel.find({})
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})  
    }

}



//Function for remove product
const removeProduct=async(req,res)=>{
    try {
     await productModel.findByIdAndDelete(req.body.id)
     res.json({success:true,message:'Product Removed'})
    } catch (error) {
     console.log(error)
     res.json({success:false,message:error.message})  
    }
 }




 //Function for single product info
const singleProduct=async(req,res)=>{
    try {
       const {productId} =req.body
       const product=await productModel.findById(productId)
       res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})  
    }

}


export{addProduct,listProducts,removeProduct,singleProduct}