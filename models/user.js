const connection = require('../db.js');
const bcrypt = require('bcrypt');

async function loginUserSQL(username, email){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT * FROM klanUsers WHERE username = ? AND email = ?`;
        connection.query(sql,[username, email],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        });
    })
}

async function registerUserSQL(username, email, password, role, consent){
    const hashPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve,reject)=>{
        const sql = `INSERT INTO klanUsers(username, email, password, role, consent) 
        VALUES(?, ?, ?, ?, ?)`;
        connection.query(sql,[username, email, hashPassword, role, consent], (err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        });
    })
}

async function changePassUserSQL(password, email){
    const hashPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve,reject)=>{
        const sql = `Update klanUsers SET password = ? WHERE email = ?`;
        connection.query(sql,[hashPassword,email],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
                console.log('changePassUser: ', row);
            }
        }) 
    });
}

async function findUserSQL(username, email){
    return new Promise((resolve, reject)=>{
        const sql = `SELECT * FROM klanUsers WHERE username = ? AND email = ?`;
        connection.query(sql,[username, email],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
                console.log('findUserByIdSQL: ',row);
            }
        } )
    })
}


async function findUserByIdSQL(userId){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT 
        klanUsers.userId,
        klanUsers.username,
        klanUsers.email,
        klanUsers.regDate,
        klanUsers.role,
        GROUP_CONCAT(DISTINCT favourite.favouriteId) AS favouritesIds,
        GROUP_CONCAT(DISTINCT carts.cartId) AS cartsIds,
        GROUP_CONCAT(DISTINCT purchases.purchaseId) AS purchasesIds
        FROM klanUsers
        LEFT JOIN favourite  ON klanUsers.userId = favourite.userId
        LEFT JOIN carts  ON klanUsers.userId = carts.userId
        LEFT JOIN purchases ON klanUsers.userId = purchases.userId
        WHERE klanUsers.userId = ?
        GROUP BY klanUsers.userId`;
        connection.query(sql,[userId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
                console.log('findUserById: ',row);
            }
        } )
    })
}

async function getBalanceByIdSQL(userId){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT * FROM balance WHERE userId = ?`;
        connection.query(sql,[userId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
                console.log('balance: ',row);
            }
        })
    });
}

async function createUserBalanceSQL(userId){
    return new Promise((resolve, reject)=>{
        const sql = `INSERT INTO balance(userId, amount) VALUES(?, ?)`;
        connection.query(sql,[userId, 0.00],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
                console.log('balance row :',row);
            }
        })
    })
};

async function checkExistSQL(email){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT * FROM klanUsers WHERE email = ?`;
        connection.query(sql,[email], (err,rows)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(rows);
                console.log('exist user row: ', rows);
            }
        })
    });
}


async function comparePassword(candidatePassword, storedPassword) {
    return await bcrypt.compare(candidatePassword, storedPassword);
}

async function deleteUserAccountSQL(userId){
    return new Promise((resolve,reject)=>{
        const sql = `DELETE FROM users WHERE userId = ? `
        connection.query(sql,[userId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            } 
        })
    });
};

async function checkExistEmailForOtherUsersSQL(email){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT 1 FROM klanUsers WHERE email = ?`;
        connection.query(sql,[email],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                if(row[0].length > 0 || row[0] || row.length > 0){
                    resolve({success:false, message:'Аккаунт с такой почтой уже существует'});
                }
                else{
                    resolve({success:true, message:'Аккаунтов с такой почтой не выявлено'});
                }
            }
        })
    })
}

async function changeUserEmailSQL(email, userId){
    return new Promise((resolve,reject)=>{
        const sql = `UPDATE klanUsers SET email = ? WHERE userId = ?`
        connection.query(sql,[email,userId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    })
};


async function getUserPageInfoSQL(username){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT 
        username,
        regDate,
        COUNT (reviews.reviewId) AS reviewCount
        FROM klanUsers 
        LEFT JOIN reviews ON klanUsers.userId = reviews.userId
        WHERE username = ?
        GROUP BY klanUsers.userId`
        connection.query(sql,[username],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row[0]);
            }
        })
    })
};

async function getUserEmailSQL(userId){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT email FROM klanUsers WHERE userId = ?`
        connection.query(sql,[userId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row[0].email);
            }
        })
    })
}

module.exports = {
    loginUserSQL, comparePassword,registerUserSQL, findUserByIdSQL,
    createUserBalanceSQL, findUserSQL, getBalanceByIdSQL, checkExistSQL,
    changePassUserSQL, deleteUserAccountSQL, changeUserEmailSQL,
    getUserPageInfoSQL, getUserEmailSQL, checkExistEmailForOtherUsersSQL
};