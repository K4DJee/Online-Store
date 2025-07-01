const connection = require('../db.js');

async function getAllShippingProductsSQL(userId){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT
        shippingId,
        products.name AS productName,
        products.description AS productDescription,
        products.price AS productPrice,
        products.salePrice AS productSalePrice,
        products.imageUrl AS productImage,
        sellers.sellerName AS sellerName,
        shippings.receivedDate,
        shippings.received,
        shippings.shippedAt
        FROM shippings 
        LEFT JOIN sellers ON shippings.sellerId = sellers.sellerId
        LEFT JOIN products ON shippings.productId = products.productId
        WHERE shippings.userId = ?
        `
        connection.query(sql,[userId],(err,rows)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(rows)
            }
        })
    })
};

async function  receiveShippingProductSQL(shippingId, userId){
    return new Promise((resolve,reject)=>{
        connection.beginTransaction((err0)=>{
            if(err0){
                return connection.rollback(() => reject(err0));
            }   
        const sql = `UPDATE shippings SET received = 1 WHERE shippingId = ? AND userId = ?`;
        const sql2 = `UPDATE purchases SET received = 1 WHERE purchaseId = ? AND userId = ?`
        connection.query(sql,[shippingId, userId],(err,row)=>{
            if(err){
                return connection.rollback(() => reject(err));
            }
            if(row.affectedRows === 0){
                resolve({
                    success: false,
                    message:'Такого товара нету'
                });
                return connection.rollback(() => reject(err));
            }
            else{
                connection.query(sql2,[shippingId, userId],(err1,row1)=>{
                    if(err1){
                        return connection.rollback(() => reject(err1));
                    }
                    else{
                        connection.commit((err2) => {
                            if (err2) {
                                return connection.rollback(() => reject(err2));
                            }

                            resolve({
                                success: true,
                                message:'Успешное получение товара'
                            });
                        });  
                    }
                })
            }
        })
        })
    })
};

// async function checkShippingProductOwner(userId, shippingId){
//     return new Promise((resolve,reject)=>{
//         const sql = `SELECT * FROM `;
//         connection.query(sql,[shippingId],(err,row)=>{
//             if(err){
//                 reject(err);
//             }
//             else{
//                 resolve(row)
//             }
//         })
//     });
// }
module.exports = {
    getAllShippingProductsSQL, receiveShippingProductSQL
}