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
    role ENUM('user', 'admin', 'seller') DEFAULT 'user',
    consent TINYINT(1) DEFAULT 0
) ENGINE=InnoDB;
`;//Пользователи
const createBalanceTable = `
CREATE TABLE IF NOT EXISTS balance (
    balanceId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    sellerId INT NULL,
    amount DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (userId) REFERENCES klanUsers(userId) ON DELETE CASCADE,
    FOREIGN KEY (sellerId) REFERENCES sellers(sellerId) ON DELETE CASCADE
) ENGINE=InnoDB;
`;//Баланс
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
`;//Товары
const createReviewsTable = `
CREATE TABLE IF NOT EXISTS reviews (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    userId INT NOT NULL,
    sellerId INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES klanUsers(userId) ON DELETE CASCADE
) ENGINE=InnoDB;
`;//Отзывы
const createCartsTable = `
CREATE TABLE IF NOT EXISTS carts (
    cartId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    productId INT NOT NULL,
    sellerId INT NOT NULL,
    quantity INT DEFAULT 1,
    addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES klanUsers(userId),
    FOREIGN KEY (productId) REFERENCES products(productId)
) ENGINE=InnoDB;
`;//Корзина
const createProductImgsTable = `
CREATE TABLE IF NOT EXISTS product_imgs (
    imageId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    productId INT(11) NOT NULL,
    imageUrl VARCHAR(512) NOT NULL,
    sortOrder INT(11) DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE
  ) ENGINE=InnoDB;
`;//Изображения товаров
const createSellersTable = `
CREATE TABLE IF NOT EXISTS sellers (
    sellerId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    sellerName VARCHAR(255) NOT NULL,
    sellerEmail VARCHAR(255),
    sellerPassword VARCHAR(255) NOT NULL,
    rating DECIMAL(3,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    totalRatings INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description TEXT
) ENGINE=InnoDB;
`;//Продавцы
const createPurchasesTable = `
CREATE TABLE IF NOT EXISTS purchases(
    purchaseId INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    userId INT NOT NULL,
    sellerId INT NOT NULL,
    sellerName VARCHAR(255) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    purchasedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES klanUsers(userId) ON DELETE CASCADE,
    FOREIGN KEY (sellerId) REFERENCES sellers(sellerId) ON DELETE CASCADE
)
`;//Покупки
const createTransactionsTable = `
CREATE TABLE IF NOT EXISTS transactions(
    transactionId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    balanceId INT,
    purchaseId INT,
    shippingId INT,
    sellerId INT,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    type ENUM('debit', 'credit') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES klanUsers(userId) ON DELETE CASCADE,
    FOREIGN KEY (purchaseId) REFERENCES purchases(purchaseId) ON DELETE SET NULL,
    FOREIGN KEY (shippingId) REFERENCES shippings(shippingId) ON DELETE SET NULL
)
`;//Денежные операции
const createShippingsTable = `
CREATE TABLE IF NOT EXISTS shippings(
    shippingId INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    purchaseId INT NOT NULL,
    sellerId INT NOT NULL,
    receivedDate DATE,
    received BOOLEAN DEFAULT FALSE,
    shippedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE,
    FOREIGN KEY (purchaseId) REFERENCES purchases(purchaseId) ON DELETE CASCADE,
    FOREIGN KEY (sellerId) REFERENCES sellers(sellerId) ON DELETE CASCADE
)
`;//Доставка
const createCategoryTable = `
CREATE TABLE IF NOT EXISTS categories(
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;//Категория


//Подключение БД
const createTable = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                console.error("Ошибка при создании таблицы:", err);
                reject(err);
            } else {
                console.log("Таблица успешно создана или уже существует.");
                resolve();
            }
        });
    });
};
async function setupDatabase() {
    try {
        await createTable(createUsersTable);         // 1. klanUsers
        await createTable(createSellersTable);       // 2. sellers
        await createTable(createCategoryTable);      // 3. categories
        await createTable(createProductsTable);      // 4. products
        await createTable(createProductImgsTable);   // 5. product_imgs
        await createTable(createCartsTable);         // 6. carts
        await createTable(createReviewsTable);       // 7. reviews
        await createTable(createPurchasesTable);     // 8. purchases
        await createTable(createShippingsTable);     // 9. shippings
        await createTable(createBalanceTable);       // 10. balance
        await createTable(createTransactionsTable);  // 11. transactions
        console.log("✅ Все таблицы успешно созданы!");
    } catch (error) {
        console.error("❌ Ошибка при настройке БД:", error);
    }
}

setupDatabase();
module.exports = connection;