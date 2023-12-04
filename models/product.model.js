const mongoose =require('mongoose')

const productSchema= mongoose.Schema({

    name:{type:String, required:true,trim:true},
    description:{type:String, required:true,trim:true},
    category:{type:String, enum:["Clothing", "Electronics","Furniture","Other" ],default:"Clothing", required:true},
Imageurl:{type:String,required:true},
location:{type:String, required:true,trim:true},
date:{type:Date, required:true,trim:true},
price:{type:Number, required:true,trim:true}
})

const ProductModel=mongoose.model("Product",productSchema)

module.exports={ProductModel}