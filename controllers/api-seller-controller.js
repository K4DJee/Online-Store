const {createBecomeSellerSQL, loginSellerSQL, findSellerSQL,
    sellerDataSQL 
} = require('../models/seller');
const {addProductBySellerSQL, getAllSellerProductsSQL, checkProductOwnerSQL,
    changeProductInfoBySellerSQL, deleteProductBySellerSQL
} = require('../models/product');
const {comparePassword} = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


const createBecomeSeller = async(req,res)=>{
    try{
        const authHeader = req.headers['authorization'];
        const {sellerName, sellerEmail, sellerPassword, description} = req.body;
        if(!sellerName || !sellerEmail ||! sellerPassword || !description){
            return res.status(400).json({message:'Wrong data', success:false});
        }
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
        const existingSeller = await findSellerSQL(sellerName);
        if(existingSeller){
            return res.status(409).json({message:'Такой продавец уже существует', success:false})
        }
        const newSellerRow = await createBecomeSellerSQL(decoded.userId, 
            sellerName, sellerEmail, sellerPassword, description);
        if(!newSellerRow.sellerId || !newSellerRow.balance){
            console.log('Ошибка при регистрации');
            return res.status(500).json({message:'Пользователь не был зарегистрирован', success:false});
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
        const sellerData = await sellerDataSQL(decoded.sellerId);
        if(!sellerData){
            return res.status(404).json({message:'Продавец не найден', success:false})
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
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const sellerToken = authHeader.split(' ')[1];
        if(!sellerToken){
           return res.status(400).json({message:'Token required', success:false});
        }
        else{
        jwt.verify(sellerToken, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ valid: false, message: 'Invalid or expired token', success:false });
            }
            else{
                res.status(200).json({ valid: true, success:true });//seller: decoded
            }
        });
        }
    } catch (error) {
        console.error('Error validating token:', error.message);
        res.status(500).json({ valid: false, message: 'Internal server error', success:false });
    }
}

const addProductBySeller = async(req,res)=>{
    try{
        const authHeader = req.headers['authorization'];
        const { name, description, price, quantity, categoryId, imageUrl, isActive} = req.body;
        if( !name || !description || !price || !quantity || !categoryId || !imageUrl || !isActive){
            return res.status(400).json({message:'Wrong data', success:false});
        }
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
        const priceINT = parseFloat(price);
        const quantityINT = parseInt(quantity, 10);
        const productRow = await addProductBySellerSQL(decoded.sellerId, name, description, 
            priceINT, quantityINT, categoryId, imageUrl, isActive)
        if(!productRow.insertId){
            return res.status(500).json({message:'Ошибка создания нового товара', success:false});
        }
        res.status(200).json({message:'Товар успешно был создан!', success:true});
    }
    catch(error){
        console.error('Error validating token:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getAllSellerProducts = async (req,res)=>{
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
        const allSellerProductsRows = await getAllSellerProductsSQL(decoded.sellerId);
        if(allSellerProductsRows.length === 0){
            return res.status(200).json({message:'Товаров не найдено', success:true, 
                sellerProductsRow:[]})
        }

        return res.status(200).json({message:'Успешно найдены товары', success:true, 
            sellerProductsRow:allSellerProductsRows
        })
    }
    catch(error){
        console.error('Error validating token:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const changeProductInfoBySeller = async (req,res)=>{
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const sellerToken = authHeader.split(' ')[1];
        if(!sellerToken){
            return res.status(400).json({message:'Token required', success:false}); 
        }   
        console.log(sellerToken);
        const {productId, name, description, price, quantity, categoryId, imageUrl, isActive} = req.body;
        if (!sellerToken || !productId || !name || !description || !price || !quantity || !categoryId || !imageUrl || !isActive) {
            return res.status(400).json({ success: false, message: 'Wrong data' });
        }
        var price2 = parseFloat(price);
        var quantity2 = parseInt(quantity, 10);
        var isActive2 = parseInt(isActive);
        const decoded = jwt.verify(sellerToken,JWT_SECRET);
        if(!decoded || !decoded.sellerId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        const productOwner = await checkProductOwnerSQL(decoded.sellerId, productId);
        if(!productOwner){
            return res.status(403).json({message:'Вам отказано в доступе изменять этот товар',
                success:false
            })
        }
        if(quantity2 === 0){
            isActive2 = 0;
        }
        const changeProductRow = await changeProductInfoBySellerSQL(
            name, description, price2, quantity2, categoryId, imageUrl, isActive2, decoded.sellerId, productId
        );
        if(changeProductRow.affectedRows === 0){
            return res.status(500).json({message:'Не удалось изменить данные товара', success:false});
        }
        return res.status(200).json({message:'Успешно изменены данные товара', success:true});
        // const changedProductRow = await 
    }
    catch(error){
        console.error('Error validating token:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server error' });
    }
}

const deleteProductBySeller = async (req,res)=>{
    try{
        const {productId} = req.body;
        if(!productId){
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
        const productOwner = await checkProductOwnerSQL(decoded.sellerId, productId);
        if(!productOwner){
            return res.status(403).json({message:'Вам отказано в доступе изменять этот товар',
                success:false
            })
        }

        const deletedProductRow = await deleteProductBySellerSQL(productId, );
        if(deletedProductRow.affectedRows === 0 || !deletedProductRow){
            return res.status(500).json({message:'Товар не удалился', success:false});
        }
        return res.status(200).json({message:'Товар был успешно удалён', success:true});
    }
    catch(error){
        console.error('Error validating token:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    createBecomeSeller, loginSeller, sellerData, validateSellerToken,
    addProductBySeller, getAllSellerProducts, changeProductInfoBySeller,
    deleteProductBySeller
}