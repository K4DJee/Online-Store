const connection = require('../db.js');
const bcrypt = require('bcrypt');

async function createBecomeSellerSQL(userId, sellerName, sellerEmail, sellerPassword,description){
    const hashPassword = await bcrypt.hash(sellerPassword, 10);
    return new Promise((resolve,reject)=>{

        connection.beginTransaction(async (err)=>{
            if(err) return reject(err);
            const sql = `
        INSERT INTO sellers(userId, sellerName, sellerEmail, sellerPassword, description) VALUES(?,?,?,?,?)
        `;
        const sql2 = `
        INSERT INTO balance(userId, sellerId) VALUES(?,?)
        `;
        try{
        connection.query(sql, [userId, sellerName, sellerEmail, hashPassword, description], (err,row)=>{
            if(err){
                return connection.rollback(() => reject(err));
            }
            const sellerId = row.insertId;
            
            connection.query(sql2, [userId, sellerId], (err2,row2)=>{
                if(err2){
                return connection.rollback(() => reject(err));
                }
                connection.commit((commitErr)=>{
                    if(commitErr){
                        return connection.rollback(() => reject(commitErr));
                    }
                    resolve({sellerId, balance:row2})
                })
            })
        });
    }
    catch(error){
        connection.rollback(()=>reject(err));
    }
        
        })
    });
}

async function loginSellerSQL(sellerName, sellerEmail){
    return new Promise((resolve,reject)=>{
        const sql = `
        SELECT * FROM sellers WHERE sellerName = ? AND sellerEmail = ?
        `;
        connection.query(sql,[sellerName, sellerEmail], (err,row)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(row[0])
            }
        })
    })
}

async function findSellerSQL(sellerName){
    return new Promise((resolve,reject)=>{
        const sql = `
        SELECT * FROM sellers WHERE sellerName = ?
        `;
        connection.query(sql,[sellerName], (err,row)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(row[0])
            }
        })
    })
}

async function sellerDataSQL(sellerId){
    return new Promise((resolve,reject)=>{
        const sql = `
        SELECT sellerName, sellerEmail, rating, totalRatings, createdAt, updatedAt, description 
        FROM sellers WHERE sellerId = ?
        `;
        connection.query(sql, [sellerId], (err,row)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(row[0])
            }
        });
    })
};

async function deleteSellerAccountSQL(sellerId){
    return new Promise((resolve,reject)=>{
        const sql = `DELETE FROM sellers WHERE sellerId = ? `
        connection.query(sql,[sellerId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row)
            }
        });
    });
};


async function getSellerPageInfoSQL(sellerName){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT 
        sellers.sellerName,
        sellers.description,
        sellers.createdAt,
        IFNULL(ROUND(AVG(reviews.rating),1),0) AS averageRating,
        COUNT (reviews.reviewId) AS reviewCount
        FROM sellers 
        LEFT JOIN reviews ON sellers.sellerId = reviews.sellerId
        WHERE sellers.sellerName = ?
        GROUP BY sellers.sellerId`
        connection.query(sql,[sellerName],(err,row)=>{
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
    createBecomeSellerSQL, loginSellerSQL, findSellerSQL, sellerDataSQL,
    deleteSellerAccountSQL, getSellerPageInfoSQL
}