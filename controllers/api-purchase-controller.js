const {
    getUserPurchasesSQL
} = require('../models/purchase');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


const getUserPurchases = async (req,res)=>{
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
    
    const userPurchases = await getUserPurchasesSQL(decoded.userId);
    if(!userPurchases.length > 0){
        return res.status(200).json({message:'Покупок не обнаружено', success:true, userPurchases:[]})
    }
    res.status(200).json({message:'Успешно обнаружены покупки', success:true, userPurchases:userPurchases});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

module.exports = {
    getUserPurchases
}