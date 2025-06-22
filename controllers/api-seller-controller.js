const {createBecomeSellerSQL, loginSellerSQL, findSellerSQL,
    sellerDataSQL
} = require('../models/seller');
const {comparePassword} = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


const createBecomeSeller = async(req,res)=>{
    try{
        const {token, sellerName, sellerEmail, sellerPassword, description} = req.body;
        if(!token || !sellerName || !sellerEmail ||! sellerPassword || !description){
            return res.status(400).json({message:'Wrong data', success:false});
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        const existingSeller = await findSellerSQL(sellerName);
        if(existingSeller){
            return res.status(401).json({message:'Такой продавец уже существует', success:false})
        }
        const newSellerRow = await createBecomeSellerSQL(decoded.userId, 
            sellerName, sellerEmail, sellerPassword, description);
        if(!newSellerRow.sellerId || !newSellerRow.balance){
            console.log('Ошибка при регистрации');
            return res.status(500).json({message:'Пользователь не зарегистрировался', success:false});
        }
        const sellerToken = jwt.sign({sellerId:newSellerRow.sellerId},
            JWT_SECRET, {expiresIn:'3h'});
        res.status(200).json({message:'Успешное создание нового продавца!', success:true, sellerToken})
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

const loginSeller = async (req,res)=>{
    try{
        const {sellerName, sellerEmail, sellerPassword} = req.body;
        if(!sellerName || !sellerEmail || !sellerPassword){
            return res.status(400).json({message:'Wrong data', success:false});
        }
        const seller_db = await loginSellerSQL(sellerName, sellerEmail);
        if(!seller_db){
            return res.status(404).json({message:'Seller not found', success:false});
        }
        const isPasswordValid = await comparePassword(sellerPassword, seller_db.sellerPassword);
        if(!isPasswordValid){
            return res.status(401).json({message:'Wrong seller password',success:false});
        }
        if(seller_db && isPasswordValid){
            const sellerToken = jwt.sign({sellerId:seller_db.sellerId, 
                sellerName: seller_db.sellerName
            }, JWT_SECRET, {expiresIn:'3h'});
            console.log('Succsess login seller. His token: ', sellerToken);
            return res.status(200).json({sellerToken});
        } 
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

const sellerData = async (req,res)=>{
    try{
        const {sellerToken} = req.body;
        if(!sellerToken){
           return res.status(400).json({message:'Token is required', success:false});
        }
        const decoded = jwt.verify(sellerToken,JWT_SECRET);
        if(!decoded || !decoded.sellerId){
            return res.status(401).json({message:'Invalid token'});
        }
        const sellerData = await sellerDataSQL(decoded.sellerId);
        if(!sellerData){
            return res.status(401).json({message:'Продавец не найден', success:false})
        }
        return res.status(200).json({message:'Success get sellerData', sellerData, success:true});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
};

const validateSellerToken = async (req,res)=>{
    try {
        const { sellerToken } = req.body;
        if (!sellerToken) {
            return res.status(400).json({ valid: false, message: 'sellerToken is required' });
        }
        else{
        jwt.verify(sellerToken, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
            }
            else{
                res.status(200).json({ valid: true });//seller: decoded
            }
        });
        }
    } catch (error) {
        console.error('Error validating token:', error.message);
        res.status(500).json({ valid: false, message: 'Server error' });
    }
}

module.exports = {
    createBecomeSeller, loginSeller, sellerData, validateSellerToken
}