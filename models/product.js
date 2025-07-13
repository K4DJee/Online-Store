const connection = require('../db.js');
const { connect } = require('../routes.js');
const { createReviewProductSQL } = require('./review.js');
const {addProductArrayImgsSQL} = require('../models/product_img.js')

    async function getProductsSQL(){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT
            products.productId,
            products.name,
            products.description,
            products.price,
            products.salePrice,
            products.quantity,
            products.imageUrl,
            categories.categoryName AS productCategory,
            products.createdAt,
            products.updatedAt,
            products.isActive,
            sellers.sellerName as sellerName,
            IFNULL(ROUND(AVG(reviews.rating), 1), 0) AS averageRating,
            COUNT (reviews.reviewId) AS reviewCount,
            GROUP_CONCAT(
                CONCAT(
                    '{\"imageId\":', product_imgs.imageId, 
                    ',\"imageUrl\":\"', product_imgs.imageUrl, '\"}'
                )
            ) AS imagesJson
            FROM products
            LEFT JOIN product_imgs ON products.productId = product_imgs.productId
            LEFT JOIN reviews ON products.productId = reviews.productId
            LEFT JOIN sellers ON products.sellerId = sellers.sellerId
            LEFT JOIN categories ON products.categoryId = categories.categoryId
            WHERE isActive = 1
            GROUP BY products.productId`; 
            connection.query(sql,(err,rows)=>{
                if(err){
                    reject(err);
                }
                else{
                    const result = rows.map(row => {
                        let images = [];
                        if (row.imagesJson) {
                            try {
                                // Парсим строку в массив JSON-объектов
                                images = JSON.parse(`[${row.imagesJson}]`);
                            } catch (e) {
                                console.error('Ошибка парсинга imagesJson:', e);
                            }
                        }
        
                        delete row.imagesJson;

                        return {
                            ...row,
                            images
                        };
                    });
                    resolve(result);
                }
            })
        })
    }

    async function  getProductByIdSQL(productId){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT
            products.productId,
            products.name,
            products.description,
            products.price,
            products.salePrice,
            products.quantity,
            categories.categoryName AS productCategory,
            products.imageUrl,
            products.createdAt,
            products.updatedAt,
            products.isActive,
            sellers.sellerName as sellerName,
            IFNULL(ROUND(AVG(reviews.rating),1),0) AS averageRating,
            COUNT (reviews.reviewId) AS reviewCount
            FROM products
            LEFT JOIN reviews ON products.productId = reviews.productId
            LEFT JOIN sellers ON products.sellerId = sellers.sellerId
            LEFT JOIN categories ON products.categoryId = categories.categoryId
            WHERE products.productId = ?
            GROUP BY products.productId`;
            connection.query(sql, [productId], (err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    console.log('product row: ', row);
                    resolve(row);
                }
            });
        })
    }

    async function addProductBySellerSQL(sellerId, name, description, price, quantity, categoryId, images, isActive){
        return new Promise((resolve,reject)=>{
            connection.beginTransaction((err)=>{
                const sql = `
                INSERT INTO products(sellerId, name, description, price, quantity, categoryId, isActive)
                VALUES(?,?,?,?,?,?,?)
                `;
                connection.query(sql,[sellerId, name, description, price, quantity, categoryId, isActive],
                    (err,row)=>{
                    if(err){
                        return connection.rollback(() => reject(err));
                    }
                    else{
                        const imgsArray = images.map(image => [row.insertId, image]);
                        const sql = `INSERT INTO product_imgs (productId,imageUrl) VALUES ?`;
                        // массовая вставка | 1 sql запрос
                            connection.query(sql,[imgsArray],(err1,row1)=>{
                                if(err1){
                                    connection.rollback(() => reject(err1));
                                }
                                else{
                                    connection.commit((commitErr)=>{
                                        if(commitErr){
                                            return connection.rollback(()=> reject(err))
                                        }
                                        else{
                                            resolve({message:'Товар успешно был добавлен', success:true});
                                        }
                                    })
                                }
                            })
                        }
                    })//обернуть в  transaction
            });
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

    async function checkProductOwnerSQL(sellerId, productId){
        return new Promise((resolve,reject)=>{
            const sql = `
            SELECT 1 FROM products WHERE sellerId = ? AND productId = ?
            `;
            connection.query(sql,[sellerId, productId], (err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(row[0]);
                }
            })
        })
    }

    async function getAllSellerProductsSQL(sellerId){
        return new Promise((resolve,reject)=>{
            const sql = `SELECT
            products.productId,
            products.name,
            products.description,
            products.price,
            products.salePrice,
            products.quantity,
            categories.categoryName AS productCategory,
            products.imageUrl,
            products.createdAt,
            products.updatedAt,
            products.isActive,
            sellers.sellerName as sellerName,
            IFNULL(ROUND(AVG(reviews.rating),1),0) AS averageRating,
            COUNT (reviews.reviewId) AS reviewCount
            FROM products
            LEFT JOIN product_imgs ON products.productId = product_imgs.productId
            LEFT JOIN reviews ON products.productId = reviews.productId
            LEFT JOIN sellers ON products.sellerId = sellers.sellerId
            LEFT JOIN categories ON products.categoryId = categories.categoryId
            WHERE products.sellerId = ?
            GROUP BY products.productId`;
            connection.query(sql,[sellerId],(err,rows)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            });
        })
    }

    async function changeProductInfoBySellerSQL(name, description, price, salePrice, quantity, categoryId, imageUrl, isActive,sellerId, productId){
        return new Promise((resolve,reject)=>{
            const sql = `   
            UPDATE products SET name = ?, description = ?, price = ?, 
            salePrice = ?,
            quantity = ?, categoryId = ?, imageUrl = ?, isActive = ?
            WHERE sellerId = ? AND productId = ?
            `;
            connection.query(sql,[name, description, price, salePrice, quantity, categoryId, imageUrl, isActive, sellerId, productId],(err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(row);
                }
            })
        })
    }

    async function deleteProductBySellerSQL(productId){
        return new Promise((resolve,reject)=>{
            const sql = `
            DELETE FROM products WHERE productId = ?
            `;
            connection.query(sql,[productId],(err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(row);
                }
            })
        });
    }



    async function buyProductTransactionSQL(userId, productId, sellerId, sellerName, quantity, receivedDate) {
    
        return new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    return reject(err);
                }
                // 0. Берём цену продукта
                const productPrice = 'SELECT price FROM products WHERE productId = ?';
                connection.query(productPrice,[productId],(err0,productPriceRow)=>{
                    if(err0){
                        return connection.rollback(() => reject(err0));
                    }
                    const price = productPriceRow[0].price;
                    const totalPrice = price * quantity;
                    if(price === null || price === undefined){
                        return resolve({ success: false, message: '❌ Ошибка получения цены товара' })
                    }
                    // 1. Проверка баланса пользователя
                    const balanceSql = 'SELECT * FROM balance WHERE userId = ? LIMIT 1';
                    connection.query(balanceSql, [userId], (err, balanceRows) => {
                        if (err) {
                            return connection.rollback(() => reject(err));
                        }
        
                        if (!balanceRows.length || balanceRows[0].amount < totalPrice) {
                            return resolve({ success: false, message: '❌ Недостаточно средств на балансе' });
                        }
        
                        const userBalanceRow = balanceRows[0];
        
                        // 2. Проверка наличия товара
                        const productSql = 'SELECT quantity FROM products WHERE productId = ?';
                        connection.query(productSql, [productId], (err, productRows) => {
                            if (err) {
                                return connection.rollback(() => reject(err));
                            }
        
                            if (!productRows.length || productRows[0].quantity < quantity) {
                                return connection.rollback(() => {
                                    resolve({ success: false, message: '❌ Недостаточно средств на балансе' });
                                });
                            }
        
                            // 3. Создание покупки
                            const purchaseSql = `
                                INSERT INTO purchases(productId, userId, sellerId, sellerName, quantity, price)
                                VALUES (?, ?, ?, ?, ?, ?)
                            `;
                            connection.query(purchaseSql, [
                                productId,
                                userId,
                                sellerId,
                                sellerName,
                                quantity,
                                price
                            ], (err, purchaseResult) => {
                                if (err) {
                                    return connection.rollback(() => reject(err));
                                }
                                const purchaseId = purchaseResult.insertId;
        
                                // 4. Запись доставки
                                const shippingSql = `
                                    INSERT INTO shippings(productId, purchaseId, sellerId, userId, receivedDate)
                                    VALUES (?, ?, ?, ?, ?)
                                `;
                                connection.query(shippingSql, [
                                    productId,
                                    purchaseId,
                                    sellerId,
                                    userId,
                                    receivedDate
                                ], (err, shippingResult) => {
                                    if (err) {
                                        return connection.rollback(() => reject(err));
                                    }
                                    const shippingId = shippingResult.insertId;
        
                                    // 5. Списание средств с баланса пользователя
                                    const deductSql = 'UPDATE balance SET amount = amount - ? WHERE userId = ?';
                                    connection.query(deductSql, [totalPrice, userId], (err) => {
                                        if (err) {
                                            return connection.rollback(() => reject(err));
                                        }
        
                                        // 6. Пополнение баланса продавца
                                        const creditSql = 'UPDATE balance SET amount = amount + ? WHERE sellerId = ?';
                                        connection.query(creditSql, [totalPrice, sellerId], (err, creditSellerRow) => {
                                            if (err) {
                                                return connection.rollback(() => reject(err));
                                            }
                                            console.log(creditSellerRow);
                                            console.log('Цена товара: ',totalPrice, 'SellerId: ', sellerId);
                                            // 7. Транзакция списания для пользователя
                                            const debitTransSql = `
                                                INSERT INTO transactions(userId, balanceId, purchaseId, shippingId, amount, type)
                                                VALUES (?, ?, ?, ?, ?, 'debit')
                                            `;
                                            connection.query(debitTransSql, [
                                                userId,
                                                userBalanceRow.balanceId,
                                                purchaseId,
                                                shippingId,
                                                totalPrice
                                            ], (err) => {
                                                if (err) {
                                                    return connection.rollback(() => reject(err));
                                                }
        
                                                // 8. Транзакция зачисления для продавца
                                                const creditTransSql = `
                                                    INSERT INTO transactions(userId, sellerId, balanceId, purchaseId, shippingId, amount, type)
                                                    VALUES (?, ?, ?, ?, ?, ?, 'credit')
                                                `;
                                                connection.query(creditTransSql, [
                                                    userId,
                                                    sellerId,
                                                    userBalanceRow.balanceId,
                                                    purchaseId,
                                                    shippingId,
                                                    totalPrice
                                                ], (err) => {
                                                    if (err) {
                                                        return connection.rollback(() => reject(err));
                                                    }
        
                                                    // 9. Уменьшение количества товара
                                                    const updateProductSql = 'UPDATE products SET quantity = quantity - ? WHERE productId = ?';
                                                    connection.query(updateProductSql, [quantity, productId], (err) => {
                                                        if (err) {
                                                            return connection.rollback(() => reject(err));
                                                        }
        
                                                        // 10. Фиксируем транзакцию
                                                        connection.commit((err) => {
                                                            if (err) {
                                                                return connection.rollback(() => reject(err));
                                                            }
        
                                                            resolve({
                                                                success: true,
                                                                purchaseId
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                })
            });
        });
    };

    async function changeSalePriceBySellerSQL(salePrice, sellerId, productId){
        return new Promise((resolve,reject)=>{
            const sql = `UPDATE products SET salePrice = ? WHERE sellerId = ? AND productId = ?`
            connection.query(sql,[salePrice, sellerId, productId],(err,row)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(row);
                }
            })
        })
    }

module.exports = {
    getProductsSQL, getProductByIdSQL, addProductBySellerSQL, checkProductOwnerSQL,
    getAllSellerProductsSQL, changeProductInfoBySellerSQL, deleteProductBySellerSQL,
    changeSalePriceBySellerSQL,

    buyProductTransactionSQL
}