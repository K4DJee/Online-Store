const {
    getUserTransactionsSQL, getSellerTransactionsSQL
} = require('../models/transaction');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


const getUserTransactions = async(req,res)=>{
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
    const userTransactionRows = await getUserTransactionsSQL(decoded.userId);
    if(!userTransactionRows.length > 0){
        return res.status(200).json({
            message:'Транзакций не найдено', success:true, 
            userTransactionRows: []
        });
    }
    return res.status(200).json({
        message:'Транзакции успешно найдены', success:true, 
        userTransactionRows: userTransactionRows
    })
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

const getSellerTransactions = async(req,res)=>{
    try{
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
    const sellerTransactionRows = await getSellerTransactionsSQL(decoded.sellerId);
    if(!sellerTransactionRows.length > 0){
        return res.status(200).json({
            message:'Транзакций не найдено', success:true, 
            sellerTransactionRows: []
        });
    }
    return res.status(200).json({
        message:'Транзакции успешно найдены', success:true, 
        sellerTransactionRows: sellerTransactionRows
    })
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

module.exports = {
    getUserTransactions, getSellerTransactions
}