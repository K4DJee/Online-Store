const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host:'MySQL-5.7',
    user:'root',
    database:'klan_db',
    password: ''
});

const createUsersTable = `
CREATE TABLE IF NOT EXISTS klanUsers (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    regDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    role ENUM('user', 'admin') DEFAULT 'user',
    consent TINYINT(1) DEFAULT 0
) ENGINE=InnoDB;
`;

const createBalanceTable = `
CREATE TABLE IF NOT EXISTS balance (
    userId INT PRIMARY KEY,
    amount DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (userId) REFERENCES klanUsers(userId) ON DELETE CASCADE
) ENGINE=InnoDB;
`;

const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
    productId INT AUTO_INCREMENT PRIMARY KEY,
    sellerId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    quantity INT DEFAULT 0 CHECK (quantity >= 0),
    categoryId INT DEFAULT NULL,
    imageUrl VARCHAR(512),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isActive TINYINT(1) DEFAULT 1 -- 1 = активный товар, 0 = неактивный
) ENGINE=InnoDB;
`;
const createReviewsTable = `
CREATE TABLE IF NOT EXISTS reviews (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    userId INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES klanUsers(userId) ON DELETE CASCADE
) ENGINE=InnoDB;
`;
const createCartsTable = `
CREATE TABLE IF NOT EXISTS carts (
    cartId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT DEFAULT 1,
    addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES klanUsers(userId),
    FOREIGN KEY (productId) REFERENCES products(productId)
) ENGINE=InnoDB;
`;
const createProductImgsTable = `
CREATE TABLE IF NOT EXISTS product_imgs (
    imageId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productId INT(11) NOT NULL,
    imageUrl VARCHAR(512) NOT NULL,
    sortOrder INT(11) DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE
  ) ENGINE=InnoDB;
`;

const createSellersTable = `
CREATE TABLE IF NOT EXISTS sellers (
    sellerId INT AUTO_INCREMENT PRIMARY KEY,
    sellerName VARCHAR(255) NOT NULL,
    brandName VARCHAR(255),
    rating DECIMAL(3,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    totalRatings INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description TEXT,
    contactEmail VARCHAR(255),
) ENGINE=InnoDB;
`;
connection.query(createUsersTable, (err, result) => {
    if (err) {
        console.log('Ошибка при создании таблицы klanUsers:', err);
    } else {
        console.log('Таблица klanUsers успешно создана или уже существует.');

        // Только после создания klanUsers создаём balance
        connection.query(createBalanceTable, (err, result) => {
            if (err) {
                console.log('Ошибка при создании таблицы balance:', err);
            } else {
                console.log('Таблица balance успешно создана или уже существует.');
            }
        });
    }
});

connection.query(createProductsTable, (err, result) => {
    if (err) {
        console.log('Ошибка при создании таблицы balance:', err);
    } else {
        console.log('Таблица ProductsTable успешно создана или уже существует.');
    }
});
connection.query(createProductImgsTable, (err,result)=>{
    if (err) {
        console.log('Ошибка при создании таблицы balance:', err);
    } else {
        console.log('Таблица productImgs успешно создана или уже существует.');
    }
});
connection.query(createReviewsTable, (err,result)=>{
    if (err) {
        console.log('Ошибка при создании таблицы balance:', err);
    } else {
        console.log('Таблица ReviewsTable успешно создана или уже существует.');
    }
});

connection.query(createCartsTable, (err,result)=>{
    if (err) {
        console.log('Ошибка при создании таблицы balance:', err);
    } else {
        console.log('Таблица CartsTable успешно создана или уже существует.');
    }
});

module.exports = connection;