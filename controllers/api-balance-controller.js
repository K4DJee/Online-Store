const {
    refillUserBalanceSQL
} = require('../models/balance');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


const refillUserBalance = async(req,res) =>{
    try{
        const {token, amount} = req.body;
        if(!token || !amount){
            res.status(400).json({message:'Wrong data', success:false});
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
}

module.exports = {
    refillUserBalance
}