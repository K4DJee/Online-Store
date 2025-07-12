const {
    getProductsSQL, getProductByIdSQL,
    buyProductTransactionSQL
} = require('../models/product');
const {
    getProductArrayImgsSQL
} = require('../models/product_img');

const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

// get products
const getProducts = async (req, res)=>{
    try{
    const products = await getProductsSQL();
    if(!products){
        return res.status(200).json({message:'Товаров не было найдено', products:[], success:false})
    }
    return res.status(200).json({products:products, success:true});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

// get product page
const getProductPage = async (req,res)=>{
    try{
        const productId = req.params.productId;
        if(!productId){
            return res.status(400).json({message:'Некорректные данные. Wrong data', productRow:null, success:false});
        }
        const productRow = await getProductByIdSQL(productId);
        if(productRow.length === 0 || !productRow[0]){
            return res.status(404).json({message:'Товар не найден. Product not found', productRow:null, success:false});
        }
        const images = await getProductArrayImgsSQL(productId);
        const response  = {
            ...productRow[0],
            images:images
        }
        return res.status(200).json({productRow:response, success:true});

    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}


const buyProduct = async(req,res)=>{
    try{
        const {productId, sellerId, sellerName, quantity, receivedDate} = req.body;
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }

        if(!productId || !sellerId || !sellerName || !quantity || !receivedDate){
            return res.status(400).json({message:'Wrong data', success:false});
        }
        const buyProductRow = await buyProductTransactionSQL(decoded.userId, productId, sellerId, sellerName, 
            quantity, receivedDate);
        if(buyProductRow.success === false || !buyProductRow.purchaseId){
            return res.status(500).json({success:false, message:"Ошибка покупки"})
        }
        return res.status(200).json({success:true, purchaseId: buyProductRow.purchaseId})

    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

module.exports = {
    getProducts, getProductPage, buyProduct
}