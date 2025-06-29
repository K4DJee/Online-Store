const connection = require('../db.js');

async function getAllProductCategoriesSQL(){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT categoryId,
        categoryName
        FROM categories`
        connection.query(sql,(err,rows)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(rows);
            }
        })
    })
};

module.exports = {
    getAllProductCategoriesSQL
}