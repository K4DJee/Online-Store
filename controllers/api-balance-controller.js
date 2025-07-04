const {
    refillUserBalanceSQL,
    getSellerBalanceSQL
} = require('../models/balance');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


const refillUserBalance = async(req,res) =>{
    try{
        const { amount} = req.body;
        if(!amount || typeof amount!= 'number' || !amount <=0){
            res.status(400).json({message:'Укажите корректную сумму пополнения', success:false});
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
            return res.status(401).json({message:'Invalid token'});
        }
        const refillBalanceRow = await refillUserBalanceSQL(decoded.userId, amount);
        if(refillBalanceRow.affectedRows === 0){
            console.log(refillBalanceRow)
            return res.status(500).json({message:'Ошибка пополнения баланса', success:false});
        }
        return res.status(200).json({message:'Успешное пополнение баланса!', success:true});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
};

const getSellerBalance = async(req,res)=>{
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
            return res.status(401).json({message:'Invalid token'});
        }

        const sellerBalanceRow = await getSellerBalanceSQL(decoded.sellerId);
        if(!sellerBalanceRow){
            return res.status(500).json({message:'Ошибка при получении данных баланса', success:false})
        }
        return res.status(200).json({message:'Успешное получение данных баланса', success:true, sellerBalance:sellerBalanceRow.amount});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

module.exports = {
    refillUserBalance, getSellerBalance
}