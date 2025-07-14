const {
    addProductArrayImgsSQL, checkProductAmountImgsSQL, deleteProductImgsSQL
} = require('../models/product_img');
const {
    checkProductOwnerSQL
} = require('../models/seller');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const addProductArrayImgs = async (req,res)=>{
    try{
        const {productId, images} = req.body;
        if(!productId || !images){
            return res.status(400).json({message:'Wrong data', success:false});
        }
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const sellerToken = authHeader.split(' ')[1];
        if(!sellerToken){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const decoded = jwt.verify(sellerToken,JWT_SECRET);
        if(!decoded || !decoded.sellerId){
            return res.status(401).json({message:'Invalid token', success:false});
        }

        const checkProductOwner = await checkProductOwnerSQL(decoded.sellerId, productId);
        if(checkProductOwner.success === false){
            return res.status(403).json({message:'У вас нет прав на совершение этих действий'});
        }

        if(images.length > 10){
            return res.status(400).json({message:'Больше 10 картинок нельзя добавлять к товару', success:false});
        }

        //checkProductAmountImgs
        const ProductAmountImgs = await checkProductAmountImgsSQL(productId);
        if(ProductAmountImgs.length + images.length > 10){
            return res.status(409).json({message:'Картинок товара не должно быть больше 10', success:false});
        }

        const values = images.map(image => [productId, image]);

        const addedImgsRow = await addProductArrayImgsSQL(values);
        if(addedImgsRow.success === false){
            return res.status(500).json({message:'Ошибка добавления картинок', success:false})
        }
        return res.status(200).json({message:'Картинки были успешно добавлены', success:true});

    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
};

const deleteProductImgs = async(req,res)=>{
    try{
        const {productId, imgsIds} = req.body;
        if(!productId || !imgsIds || imgsIds.length === 0){
            return res.status(400).json({message:'Wrong data', success:false});
        }
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const sellerToken = authHeader.split(' ')[1];
        if(!sellerToken){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const decoded = jwt.verify(sellerToken,JWT_SECRET);
        if(!decoded || !decoded.sellerId){
            return res.status(401).json({message:'Invalid token', success:false});
        }

        const checkProductOwner = await checkProductOwnerSQL(decoded.sellerId, productId);
        if(checkProductOwner.success === false){
            return res.status(403).json({message:'У вас нет прав на совершение этих действий', success:false});
        }
        const deleteProductImgs = await deleteProductImgsSQL(imgsIds);
        if(deleteProductImgs.sucess === false){
            return res.status(500).json({message:'Ошибка удаления картинок товара', success:false});
        }
        return res.status(200).json({message:'Картинки были успешно удалены', success:true})
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

module.exports = {
    addProductArrayImgs, deleteProductImgs
}