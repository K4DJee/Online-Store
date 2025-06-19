const {
    addProductInCartSQL, changeQuantityProductsInCartSQL, deleteProductInCartSQL,
    getProductsFromCartSQL, checkProductQuantitySQL, checkProductExistsSQL,
    checkCartItemExistsSQL
} = require('../models/cart');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');


const addProductInCart = async (req,res)=>{
    const {token, productId, quantity} = req.body;
    try{
    if(!token){
        return res.status(401).json({message:'Token required', success:false});
    }
    const decoded = jwt.verify(token,JWT_SECRET);
    if(!decoded || !decoded.userId){
        return res.status(401).json({message:'Invalid token', success:false});
    }
    if(!productId || !quantity){
        return res.status(400).json({message:'Wrong data', success:false});
    }
    const productExists = await checkProductExistsSQL(productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Товар не найден', success: false });
        }
    //checkProductQuantity
    const checkProductQuantityRow = await checkProductQuantitySQL(productId);
    if(checkProductQuantityRow.quantity < quantity){
        return res.status(400).json({message:'Количество выбранных товаров превышает количество имеющихся',
            success:false
        });
    }
    if(quantity < 0) {
        return res.status(400).json({message: 'Количество не может быть отрицательным', success: false});
    }
    const addProductInCartRow = await addProductInCartSQL(decoded.userId,productId,quantity);
    if(!addProductInCartRow.insertId){
        return res.status(500).json({message:'Ошибка добавления товара в корзину', success:false});
    }
    return res.status(200).json({message:'Товар успешно был добавлен в корзину', success:true, 
        addProductInCartRow:addProductInCartRow});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
};

const changeQuantityProductsInCart = async (req,res)=>{
    const {token, cartId, quantity} = req.body;
    try{
        if(!token){
            return res.status(401).json({message:'Token required', success:false});
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        if(!cartId || !quantity){
            return res.status(400).json({message:'Wrong data', success:false});
        }
        const cartItemExists = await checkCartItemExistsSQL(decoded.userId, cartId);
            if(!cartItemExists) {
                return res.status(404).json({message: 'Товар в корзине не найден', success: false});
            }
        //checkProductQuantity
        if(quantity === 0){
            const deleteProductInCartRow = await deleteProductInCartSQL(decoded.userId, cartId);
            if(deleteProductInCartRow.affectedRows === 0 || !deleteProductInCartRow){
                return res.status(500).json({message:'Товар из корзины не был удалён', success:false});
            }
            return res.status(200).json({message:'Товар был успешно удалён из корзина', success:true,
                deleteProductInCartRow:deleteProductInCartRow
            })
        }
        const changeQuantityProductsRow = await changeQuantityProductsInCartSQL(decoded.userId, cartId, quantity);
        if(changeQuantityProductsRow.affectedRows === 0){
            return res.status(200).json({message:'Данный товар в корзине не найден', success:false});
        }
        if(changeQuantityProductsRow.changedRows === 0){
            return res.status(200).json({message:'Данные товара в корзине не изменились', success:false});
        }
        return res.status(200).json({message:'Данные товара успешно изменились', success:true, 
            changeQuantityProductsRow:changeQuantityProductsRow
        })
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});
    }
};

const deleteProductInCart = async (req,res)=>{
    const {token, cartId} = req.body;
    try{
        if(!token){
            return res.status(401).json({message:'Token required', success:false}); 
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        if(!cartId){
            return res.status(400).json({message:'Wrong data', success:false});
        }
        const deleteProductInCartRow = await deleteProductInCartSQL(decoded.userId, cartId);
        if(deleteProductInCartRow.affectedRows === 0 || !deleteProductInCartRow){
            return res.status(500).json({message:'Ошибка удаления товара из корзина', success:false});
        }
        return res.status(200).json({message:'Товар был успешно удалён из корзины', success:true, 
            deleteProductInCartRow:deleteProductInCartRow
        })

    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});  
    }
};

const getProductsFromCart = async (req,res)=>{
    const {token} = req.body;
    try{
        if(!token){
            return res.status(401).json({message:'Token required', success:false}); 
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        const cartProductsRow = await getProductsFromCartSQL(decoded.userId);
        if(cartProductsRow.length === 0 ){
            return res.status(200).json({message:'Товаров не найдено', success:true, cartProductsRow:[]});
        }
        return res.status(200).json({message:'Успешно выгружены товары', success:true, 
            cartProductsRow:cartProductsRow
        })
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error'});  
    }
}

module.exports = {
    addProductInCart, changeQuantityProductsInCart, deleteProductInCart,
    getProductsFromCart

};