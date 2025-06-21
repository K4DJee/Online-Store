const connection = require('../db.js');

async function getProductArrayImgsSQL(productId){
    return new Promise((resolve,reject)=>{
        const sql = `
        SELECT * FROM product_imgs WHERE productId = ?
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

module.exports = {
    getProductArrayImgsSQL
};