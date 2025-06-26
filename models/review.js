const connection = require('../db.js');

async function createReviewProductSQL(productId, userId, sellerId, rating, comment){
    return new Promise((resolve,reject)=>{
        const sql = `
        INSERT INTO reviews(productId, userId, sellerId, rating, comment) 
        VALUES(?,?,?,?,?)
        `;
        connection.query(sql, [productId, userId, sellerId, rating, comment], (err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    });
}

async function changeReviewContentSQL(comment, rating, reviewId){
    return new Promise((resolve,reject)=>{
        const sql = `
        UPDATE reviews SET comment = ?, rating = ? WHERE reviewId = ?
        `;
        connection.query(sql, [comment, rating, reviewId], (err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    });
}

async function deleteUserReviewSQL(reviewId){
    return new Promise((resolve,reject)=>{
        const sql = `
        DELETE FROM reviews WHERE reviewId = ?
        `;
        connection.query(sql,[reviewId],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    });
};

async function allProductReviewsSQL(productId){
    return new Promise((resolve,reject)=>{
        const sql = `
        SELECT
        reviews.*,
        klanUsers.username AS reviewerUsername
        FROM reviews 
        LEFT JOIN klanUsers ON reviews.userId = klanUsers.userId
        WHERE productId = ?
        `;
        connection.query(sql, [productId], (err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        });
    })
}

async function allUserReviewsSQL(userId){
    return new Promise((resolve, reject)=>{
        const sql = `SELECT * FROM reviews WHERE userId = ?`;
        connection.query(sql,[userId], (err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    });
}

async function checkReviewOwnershipSQL(reviewId, userId){
    return new Promise((resolve,reject)=>{
        const sql = `
        SELECT 1 FROM reviews WHERE reviewId = ? AND userId = ?
        `;
        connection.query(sql,[reviewId, userId], (err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row);
            }
        })
    });
}

async function averageProductRatingSQL(productId){
    return new Promise((resolve, reject)=>{
        const sql = `SELECT AVG(rating) AS averageRating
        FROM reviews
        WHERE productId = ?`;
        connection.query(sql,[productId], (err,row)=>{
            if(err){
                reject(err);
            }
            else{
                const averageRating = row[0]?.averageRating
                resolve(averageRating ? parseFloat(averageRating).toFixed(1) : null);
            }
        })
    });
}

async function sellerProductSQL(sellerName){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT sellerId FROM sellers WHERE sellerName = ? LIMIT 1`
        connection.query(sql,[sellerName],(err,row)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(row[0]);
            }
        })
    });
}


module.exports = {createReviewProductSQL, allProductReviewsSQL, allUserReviewsSQL,
    averageProductRatingSQL, changeReviewContentSQL, deleteUserReviewSQL, checkReviewOwnershipSQL,
    sellerProductSQL    
};