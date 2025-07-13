const {
    addToFavoriteSQL, getFavoriteProductsSQL, existProductInFavoriteSQL, deleteProductInFavoriteSQL,
    existFavouriteProductSQL
} = require('../models/favourite');
const {
    findSellerSQL
} = require('../models/seller');
const{
    adaptFavouriteProduct
} = require('../adapters/favourite-adapter');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const addToFavorite = async (req,res)=>{
    try{
        const {productId, sellerName} = req.body;
        if(!productId || !sellerName){
            return res.status(400).json({message:'Wrong data', success:false});
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
        }
        const sellerRow = await findSellerSQL(sellerName);
        if(!sellerRow.sellerId){
            return res.status(404).json({message:"Продавец с таким именем не найден", success:false});
        }

        const existFavouriteProduct = await existFavouriteProductSQL(productId, decoded.userId);
        if(existFavouriteProduct.success === false){
            return res.status(409).json({message:'Товар уже существует в избранном', success:false});
        }
        
        const newFavoriteProductRow = await addToFavoriteSQL(decoded.userId, productId, sellerRow.sellerId);
        if(!newFavoriteProductRow.insertId){
            return res.status(500).json({message:'Ошибка при добавлении товара в избранное', success:false})
        }
        return res.status(200).json({message:'Товар был успешно добавлен в избранное', success:true});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

const getAllProductsInFavorite = async (req,res)=>{
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
        const favouriteProducts = await getFavoriteProductsSQL(decoded.userId);
        if(favouriteProducts.length === 0){
            return res.status(200).json({message:'Товаров в избранном не найдено', success:true, favouriteProducts:[]});
        }

        const adaptedProducts = favouriteProducts.map(product => adaptFavouriteProduct(product));

        return res.status(200).json({message:'Товары в избранном успешно найдены', success:true, favouriteProducts:adaptedProducts});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

const deleteProductFromFavorite = async (req,res)=>{
    try{
        const {favouriteId} = req.body;
        if(!favouriteId){
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
        }

        const existProductInFavorite = await existProductInFavoriteSQL(favouriteId);
        if(!existProductInFavorite){
            return res.status(404).json({message:'Такого товара в избранном нету', success:false});
        }

        const deleteProductInFavorite = await deleteProductInFavoriteSQL(decoded.userId, favouriteId);
        if(deleteProductInFavorite.affectedRows === 0){
            return res.status(500).json({message:'Ошибка при удалении товара из избранного', success:false});
        }
        return res.status(200).json({message:'Товар успешно был удалён из избранного', success:true});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

module.exports = {
    addToFavorite, getAllProductsInFavorite, deleteProductFromFavorite
}