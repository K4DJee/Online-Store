const connection = require('../db.js');

async function getProductArrayImgsSQL(productId){
    return new Promise((resolve,reject)=>{
        const sql = `
        SELECT
        imageId,
        imageUrl AS url
        FROM product_imgs WHERE productId = ?
        `;
        connection.query(sql,[productId], (err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    });
}

async function addProductArrayImgsSQL(imgsArray){
    return new Promise((resolve,reject)=>{
        const sql = `
        INSERT INTO product_imgs (productId,imageUrl) VALUES ?
        `;// массовая вставка | 1 sql запрос
        connection.query(sql,[imgsArray],(err,row)=>{
            if(err){
                return reject({ success: false, message: err.message });
            }
            else{
                resolve({ success: true, affectedRows: row.affectedRows });
            }
        })
    })
}

module.exports = {
    getProductArrayImgsSQL, addProductArrayImgsSQL
};