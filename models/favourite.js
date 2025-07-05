const connection = require('../db.js');

async function addToFavoriteSQL(userId, productId, sellerId){
    return new Promise((resolve,reject)=>{
        const sql = `INSERT INTO favourite(userId, productId, sellerId)
        VALUES(?,?,?)`;
        connection.query(sql, [userId, productId, sellerId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    });
}

async function getFavoriteProductsSQL(userId){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT
        favouriteId,
        favourite.productId,
        products.name AS productName,
        products.description AS productDescription,
        products.price AS productPrice,
        products.salePrice AS productSalePrice,
        products.imageUrl AS productImage,
        sellers.sellerName AS sellerName
        FROM favourite
        LEFT JOIN sellers ON favourite.sellerId = sellers.sellerId
        LEFT JOIN products ON favourite.productId = products.productId
        WHERE favourite.userId =  ?
        `;
        connection.query(sql,[userId], (err,rows)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(rows);
            }
        })
    })
};

async function deleteProductInFavoriteSQL(userId, favouriteId){
    return  new Promise((resolve,reject)=>{
        const sql = `DELETE FROM favourite WHERE userId = ? AND favouriteId = ?`;
        connection.query(sql,[userId, favouriteId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            } 
        })
    })
};

async function existProductInFavoriteSQL(favouriteId){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT * FROM favourite WHERE favouriteId = ?`;
        connection.query(sql,[favouriteId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row[0]);
            } 
        })
    })
}

module.exports = {
    addToFavoriteSQL, getFavoriteProductsSQL, deleteProductInFavoriteSQL, existProductInFavoriteSQL
}