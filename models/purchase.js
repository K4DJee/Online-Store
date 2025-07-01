const connection = require('../db.js');

async function getUserPurchasesSQL(userId){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT 
        sellerName,
        quantity,
        price, 
        purchasedAt,
        received
        FROM purchases WHERE userId = ?`;
        connection.query(sql,[userId],(err,rows)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(rows)
            }
        });
    })
};


module.exports = {
    getUserPurchasesSQL
}