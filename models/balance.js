const connection = require('../db.js');

async function refillUserBalanceSQL(userId, amount){
    return new Promise((resolve,reject)=>{
        const sql = `
        UPDATE balance SET amount = amount + ? WHERE userId = ?
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

module.exports = {
    refillUserBalanceSQL,
}