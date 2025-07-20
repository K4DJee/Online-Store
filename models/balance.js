const connection = require('../db.js');

async function refillUserBalanceSQL(userId, amount){
    return new Promise((resolve,reject)=>{
        connection.beginTransaction((err0)=>{
            if (err0) {
                return connection.rollback(() => reject({ success: false, error: err0 }));
            }
            const sql = `
            UPDATE balance SET amount = amount + ? WHERE userId = ? AND sellerId IS NULL
            `;
            const sql2 = `INSERT INTO transactions(userId, balanceId, amount, type) VALUES(?,?,?,'credit')`;
            connection.query(sql,[amount,userId],(err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    if(row.changedRows > 0){
                        connection.query(sql2,[userId, userId, amount],(err2,row2)=>{
                            if(err2){
                                return connection.rollback(() => reject({success:false}));
                            }
                            else{
                                connection.commit((commitErr)=>{
                                    if(commitErr){
                                        return connection.rollback(() => reject({success:false}));
                                    }
                                    if(row2.insertId){
                                        resolve({success:true})
                                    }
                                    else{
                                        return connection.rollback(() => reject({success:false}));
                                    }
                                })
                            }
                        })
                    }
                    else{
                        return connection.rollback(() => reject({success:false}));
                    }
                }
            })
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