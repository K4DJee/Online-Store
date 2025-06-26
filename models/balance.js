const connection = require('../db.js');

async function refillUserBalanceSQL(userId, amount){
    return new Promise((resolve,reject)=>{
        const sql = `
        UPDATE balance SET amount = amount + ? WHERE userId = ? AND sellerId IS NULL
        `;
        connection.query(sql,[amount,userId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    });
};

async function getSellerBalanceSQL(sellerId){
    return new Promise((resolve,reject)=>{
        const sql = `
        SELECT amount FROM balance WHERE sellerId = ? 
        `;
        connection.query(sql,[sellerId],(err,row)=>{
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
    refillUserBalanceSQL, getSellerBalanceSQL
}