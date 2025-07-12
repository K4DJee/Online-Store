const connection = require('../db.js');
const { use } = require('../mail.js');

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
        MAX(favourite.productId) AS productId,
        products.name AS productName,
        products.description AS productDescription,
        products.price AS productPrice,
        products.salePrice AS productSalePrice,
        products.quantity,
        categories.categoryName AS productCategory,
        products.imageUrl AS productImage,
        products.createdAt,
        products.updatedAt,
        products.isActive,
        MAX(sellers.sellerName) AS sellerName,
        (
            SELECT IFNULL(ROUND(AVG(rating), 1), 0)
            FROM reviews
            WHERE reviews.productId = favourite.productId
        ) AS averageRating,
        (
            SELECT COUNT(*)
            FROM reviews
            WHERE reviews.productId = favourite.productId
        ) AS reviewCount,
        GROUP_CONCAT(
            CONCAT(
                '{\"imageId\":', product_imgs.imageId, 
                ',\"imageUrl\":\"', product_imgs.imageUrl, '\"}'
            )
        ) AS imagesJson
        FROM favourite
        LEFT JOIN product_imgs ON favourite.productId = product_imgs.productId
        LEFT JOIN sellers ON favourite.sellerId = sellers.sellerId
        LEFT JOIN products ON favourite.productId = products.productId
        LEFT JOIN categories ON products.categoryId = categories.categoryId
        WHERE favourite.userId =  ?
        GROUP BY sellers.sellerName, favourite.productId
        `;
        connection.query(sql,[userId], (err,rows)=>{
            if(err){
                reject(err);
            }
            else{
                const result = rows.map(row => {
                    let images = [];
                    if (row.imagesJson) {
                        try {
                            // Парсим строку в массив JSON-объектов
                            images = JSON.parse(`[${row.imagesJson}]`);
                        } catch (e) {
                            console.error('Ошибка парсинга imagesJson:', e);
                        }
                    }
    
                    delete row.imagesJson;

                    return {
                        ...row,
                        images
                    };
                });
                resolve(result);
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

async function existFavouriteProductSQL(productId, userId){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT 1 FROM favourite WHERE productId = ? AND userID = ?`
        connection.query(sql,[productId,userId],(err,row)=>{
            if(err){
                return reject({ success: true, message: err.message });
            }
            else{
                console.log(row);
                if(row.length > 0 || row[0]){
                    resolve({success:false});
                }
                else{
                    resolve({success:true});
                }
            }
        })
    })
}

module.exports = {
    addToFavoriteSQL, getFavoriteProductsSQL, deleteProductInFavoriteSQL, existProductInFavoriteSQL,
    existFavouriteProductSQL
}