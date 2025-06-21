const connection = require('../db.js');

    async function getProductsSQL(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT products.*,
            IFNULL(ROUND(AVG(reviews.rating), 1), 0) AS averageRating,
            COUNT (reviews.reviewId) AS reviewCount
            FROM products
            LEFT JOIN reviews ON products.productId = reviews.productId
            GROUP BY products.productId`; 
            connection.query(sql,(err,rows)=>{
                if(err){
                    reject(err);
                }
                else{
                    
                    resolve(rows);
                }
            })
        })
    }

    async function  getProductByIdSQL(productId){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT products.*,
            IFNULL(ROUND(AVG(reviews.rating),1),0) AS averageRating,
            COUNT (reviews.reviewId) AS reviewCount
            FROM products
            LEFT JOIN reviews ON products.productId = reviews.productId
            WHERE products.productId = ?
            GROUP BY products.productId`;
            connection.query(sql, [productId], (err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    console.log('product row: ', row);
                    resolve(row);
                }
            });
        })
    }

module.exports = {
    getProductsSQL, getProductByIdSQL
}