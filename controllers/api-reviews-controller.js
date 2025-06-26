const {
    createReviewProductSQL, allProductReviewsSQL, averageProductRatingSQL,
    allUserReviewsSQL, deleteUserReviewSQL, changeReviewContentSQL, 
    checkReviewOwnershipSQL, sellerProductSQL
} = require('../models/review');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


const newProductReview = async (req,res)=>{
    try{
        const {productId} = req.params;
        const {rating, comment, sellerName} = req.body;
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(401).json({message:'Token required', success:false}); 
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({message:'Token required', success:false}); 
        }
    if(!productId || !rating || !comment || !sellerName){
        return res.status(400).json({message:'Wrong data. All fields required!', success:false})
    }
    if(rating > 5 || rating < 1) {
        return res.status(400).json({message: 'Rating must be between 1 and 5', success: false});
    }
    const decoded = jwt.verify(token,JWT_SECRET);
    if(!decoded || !decoded.userId){
        return res.status(401).json({message:'Invalid token', success:false});
    }

    const sellerId = await sellerProductSQL(sellerName);
    if(!sellerId){
        return res.status(404).json({message:'Продавец товара не найден', success:false});
    }
    const reviewRow = await createReviewProductSQL(productId, decoded.userId, sellerId, rating, comment);
    if(!reviewRow.insertId){
        return res.status(500).json({message:'Ошибка создания отзыва', success:false});
    }
    res.status(200).json({message:'Success created review', success:true});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

const changeReviewContent = async(req,res)=>{
    try{
        const {comment, rating, reviewId} = req.body;
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        if(!comment || !rating || !reviewId){
            return res.status(400).json({message:'Wrong data', success:false});
        }
        if(rating > 5 || rating < 1) {
            return res.status(400).json({message: 'Rating must be between 1 and 5', success: false});
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        const checkReviewOwnershipRow = await checkReviewOwnershipSQL(reviewId, decoded.userId);
        if(checkReviewOwnershipRow.length === 0){
            return res.status(403).json({message:'Вы не можете редактировать данный отзыв', success:false});
        }
        const updateReviewRow = await changeReviewContentSQL(comment, rating, reviewId);
        if(updateReviewRow.affectedRows === 0){
            return res.status(404).json({message:'Отзыв не найден', success:false});
        }
        if(updateReviewRow.changedRows === 0){
            return res.status(200).json({message:'Данные не изменились', success:false});
        }
        res.status(200).json({message:'Данные отзыва изменились',success:true});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

const deleteUserReview = async(req,res)=>{
    try{
        const {reviewId} = req.body;
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        if(!reviewId){
            return res.status(400).json({message:'Wrong data', success:false});
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        const checkReviewOwnershipRow = await checkReviewOwnershipSQL(reviewId, decoded.userId);
        if(checkReviewOwnershipRow.length === 0){
            return res.status(403).json({message:'Вы не можете удалить чужой отзыв', success:false});
        }
        const deletedReviewRow = await deleteUserReviewSQL(reviewId);
        if(deletedReviewRow.affectedRows === 0 || !deletedReviewRow){
            return res.status(500).json({message:'Отзыв не был удалён', success:false});
        }
        return res.status(200).json({message:'Отзыв успешно был удалён', success:true});

    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

const allProductReviews = async (req,res)=>{
    try{
        const {productId} = req.params;
    if(!productId){
        return res.status(400).json({message:'Wrong data. ProductId required', success:false});
    }
    const reviewRows = await allProductReviewsSQL(productId);
    if(reviewRows.length === 0){
        res.status(200).json({message:'Отзывов у данного товара не найдено', success:true, reviewsRow:[]});
    }
    if(reviewRows.length > 0){
        res.status(200).json({success:true, reviewRows:reviewRows})
    }
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

const allUserReviews = async(req,res)=>{
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
        return res.status(401).json({message:'Invalid token', valid:false, success:false});
    }
    const userReviewsRows = await allUserReviewsSQL(decoded.userId);
    if(userReviewsRows.length === 0){
        res.status(200).json({message:'У пользователя ещё нет отзывов', success:true, userReviewsRows:[]})
    }
    res.status(200).json({userReviewsRows:userReviewsRows, success:true});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

const averageProductRating = async (req,res)=>{
    try{
        const {productId} = req.params;
    if(!productId){
        res.status(400).json({message:'Wrong data. ProductId required'});
    }
    const averageRating = await averageProductRatingSQL(productId);
    if(!averageRating){
        return res.status(200).json({message:'Product dont have rating', success:true, averageRating: null});
    }
    return res.status(200).json({ averageRating:averageRating, success:true });
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

module.exports = {
    newProductReview, allProductReviews, allUserReviews, averageProductRating,
    deleteUserReview, changeReviewContent

}