const {
    getProductsSQL, getProductByIdSQL
} = require('../models/product');
const {
    getProductArrayImgsSQL
} = require('../models/product_img');

// get products
const getProducts = async (req, res)=>{
    try{
    const products = await getProductsSQL();
    if(!products){
        return res.status(400).json({message:'Товаров не было найдено', data:null})
    }
    res.status(200).json({products:products});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

// get product page
const getProductPage = async (req,res)=>{
    try{
        const productId = req.params.productId;
        if(!productId){
            return res.status(400).json({message:'Некорректные данные. Wrong data', data:null});
        }
        const productRow = await getProductByIdSQL(productId);
        if(productRow.length === 0 || !productRow[0]){
            return res.status(404).json({message:'Товар не найден. Product not found', data:null});
        }
        const images = await getProductArrayImgsSQL(productId);
        const response  = {
            ...productRow[0],
            images:images
        }
        res.status(200).json({productRow:response});

    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
}


module.exports = {
    getProducts, getProductPage
}