const connection = require('../db.js');

    async function getUserTransactionsSQL(userId){
        return new Promise(((resolve,reject)=>{
            const sql = `SELECT 
            transactions.amount,
            transactions.type,
            transactions.createdAt
            FROM transactions WHERE userId = ? AND sellerId IS NULL`;
            connection.query(sql,[userId], (err,rows)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            })
        }));
    };

    async function getSellerTransactionsSQL(sellerId){
        return new Promise(((resolve,reject)=>{
            const sql = `SELECT 
            transactions.amount,
            transactions.type,
            transactions.createdAt,
            klanUsers.username AS userBuyer
            FROM transactions 
            LEFT JOIN klanUsers ON transactions.userId = klanUsers.userId
            WHERE sellerId = ?`;
            connection.query(sql,[sellerId], (err,rows)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            })
        }));
    }

    
module.exports = {
    getUserTransactionsSQL, getSellerTransactionsSQL
};