const connection = require('../db.js');

    async function addProductInCartSQL(userId, sellerId, productId, quantity){
        return new Promise((resolve,reject)=>{
            const sql = `
            INSERT INTO carts(userId, sellerId, productId,quantity) VALUES(?,?,?,?)
            `;
            connection.query(sql,[userId, sellerId, productId,quantity], (err, row)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(row);
                }
            })
        });
    }
    
    async function deleteProductInCartSQL(userId, cartId){
        return new Promise((resolve,reject)=>{
            const sql = `
            DELETE FROM carts WHERE userId = ? AND cartId = ?
            `;
            connection.query(sql,[userId,cartId],(err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(row);
                }
            });
        });
    }

    async function changeQuantityProductsInCartSQL(userId,cartId,quantity){
        return new Promise((resolve,reject)=>{
            const sql = `
            UPDATE carts SET quantity = ? WHERE userId = ? AND cartId = ?
            `;
            connection.query(sql,[quantity,userId, cartId],(err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(row);
                }
            });
        });
    }

    async function getProductsFromCartSQL(userId){
        return new Promise((resolve,reject)=>{
            const sql = `
            SELECT carts.cartId, carts.productId, carts.quantity, carts.addedAt,
            sellers.sellerName AS sellerName,
            products.name AS productName,
            products.description AS productDescription,
            products.price AS productPrice,
            products.salePrice AS salePrice,
            products.imageUrl AS imageUrl
            FROM carts 
            LEFT JOIN products ON carts.productId = products.productId
            LEFT JOIN sellers ON carts.sellerId = sellers.sellerId
            WHERE carts.userId = ?
            `;
            connection.query(sql,[userId], (err,rows)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            });
        })
    }

    async function checkProductQuantitySQL(productId){
        return new Promise((resolve,reject)=>{
            const sql = `
            SELECT quantity FROM products WHERE productId = ?
            `;
            connection.query(sql, [productId], (err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(row[0]);
                }
            });
        });
    }


    async function checkProductExistsSQL(productId) {
        const [rows] = await connection.promise().query(
            'SELECT 1 FROM products WHERE productId = ? LIMIT 1',
            [productId]
        );
        return rows.length > 0;
    }

    async function checkCartItemExistsSQL(userId, cartId) {
        const [rows] = await connection.promise().query(
            'SELECT 1 FROM carts WHERE userId = ? AND cartId = ? LIMIT 1',
            [userId, cartId]
        );
        return rows.length > 0;
    }

    async function checkProductInCartExistsSQL(cartId){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT * FROM carts WHERE cartId = ? LIMIT 1`
            connection.query(sql,[cartId],(err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(row[0]);
                }
            })
        });
    }

module.exports = {
    addProductInCartSQL, changeQuantityProductsInCartSQL, deleteProductInCartSQL,
    getProductsFromCartSQL, checkProductQuantitySQL, checkProductExistsSQL,
    checkCartItemExistsSQL, checkProductInCartExistsSQL
};