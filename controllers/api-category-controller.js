const {
    getAllProductCategoriesSQL
} = require('../models/categories')

const getAllProductCategories = async(req,res)=>{
    try{
        const productCategories = await getAllProductCategoriesSQL();
        if(!productCategories.length > 0){
            return res.status(404).json({message:'Категории товаров не найдены', success:false})
        }
        return res.status(200).json({message:'Успешно найдены категории товаров', success:true,
            productCategories:productCategories
        })
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

module.exports = {
    getAllProductCategories
}