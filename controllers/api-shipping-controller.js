require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const {
    receiveShippingProductSQL, getAllShippingProductsSQL
} = require('../models/shipping');

const getAllShippingProducts = async (req,res)=>{
    try{
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

        const allShippingProducts = await getAllShippingProductsSQL(decoded.userId);
        if(allShippingProducts.length === 0){
            return res.status(200).json({message:'Товаров, находящихся в доставке не найдено', success:true, shippingProducts:[]});
        }
        return res.status(200).json({message:'Товары успешно найдены', success:true, shippingProducts:allShippingProducts});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

const receiveShippingProduct = async(req,res)=>{
    try{
        const {shippingId} = req.body;
        if(!shippingId){
            return res.status(400).json({message:'Wrong data', success:false})
        }
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
        };

        const receiveProductRow = await receiveShippingProductSQL(shippingId, decoded.userId);
        if(receiveProductRow.success === false){
            return res.status(500).json({message:'Ошибка при получении товара', success:false});
        }
        return res.status(200).json({success:receiveProductRow.success, message:receiveProductRow.message})

    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

module.exports = {
    receiveShippingProduct, getAllShippingProducts
}

