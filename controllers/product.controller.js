const {ProductModel} =require("../models/product.model")

const addproduct=async(req,res)=>{
    const{name,description,category,Imageurl,location,date,price}=req.body
    try {
        const product =new ProductModel({name,description,category,Imageurl,location,date,price})
        await product.save()
        res.status(200).send({success:true, message:"product added"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

const editproduct = async(req,res) =>{
    const productId=req.params.id;
    const updatedProductData=req.body
    const{userID} =req.body

try {
    const data=await ProductModel.findById(productId)
    if(data.userID.equals(userID)) {
        const product=await ProductModel.findByIdAndUpdate(productId,updatedProductData,{
            new:true,

        })
        res.status(200).send({success:true, message:"product edited"})

    }else{
        res.status(200).send({success:true, message:"product was not yours"})

    }
} catch (error) {
    res.status(400).send({error:error.message})

}

}

const deleteproduct=async (req,res) =>{
    const productId=req.params.id
    const {userID}=req.body

    try{
        const data = await ProductModel.findById(productId)
        if(data.userID.equals(userID)) {
            const loki=await ProductModel.findByIdAndDelete(productId)
            res.status(200).send({success:true, message:"product deleted"})
    
        }else{
            res.status(200).send({success:true, message:"product was not yours"})
    
        }
    }catch(error){
        res.status(400).send({error:error.message})

    }
}

const getproduct = async (req, res) => {
    console.log(req.query);
    let { name, category, date, order } = req.query;

    try {
        const filters = {};

        if (name) {
            filters.name = new RegExp(name, 'i');
        }
        if (category) {
            filters.category = new RegExp(category, 'i');
        }
        if (date) {
            filters.date = new Date(date);
        }

        const sort = {};
        if (order === 'asc') {
            sort.date = 1; 
        } else if (order === 'desc') {
            sort.date = -1; 
        }

        const data = await ProductModel.find(filters).sort(sort);

        res.status(200).send({
            success: true,
            data: data,
            message: "All products data fetched in order",
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = { addproduct, editproduct, deleteproduct, getproduct };


module.exports={addproduct,editproduct,deleteproduct,getproduct}