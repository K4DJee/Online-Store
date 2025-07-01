require('dotenv').config();
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_WRITE_API_KEY);
const index = client.initIndex('products');
const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host:'MySQL-5.7',
    user:'root',
    database:'klan_db',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


const algoliaSQL = `SELECT
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
    IFNULL(ROUND(AVG(reviews.rating), 1), 0) AS averageRating,
    COUNT (reviews.reviewId) AS reviewCount
    FROM products
    LEFT JOIN reviews ON products.productId = reviews.productId
    LEFT JOIN sellers ON products.sellerId = sellers.sellerId
    LEFT JOIN categories ON products.categoryId = categories.categoryId
    WHERE isActive = 1
    GROUP BY products.productId
`

async function syncProductsToAlgolia(){
    try{
    const [rows] = await connection.query(algoliaSQL);

    const objects = rows.map(row =>({
        objectID: row.productId.toString(),
        name: row.name,
        description: row.description,
        price: row.price,
        salePrice: row.salePrice,
        productCategory: row.productCategory,
        imageUrl: row.imageUrl,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        isActive: row.isActive,
        averageRating: row.averageRating,
        reviewCount: row.reviewCount
    }));

    await index.saveObjects(objects);
    console.log(`Synced ${objects.length} products to Algolia`);
    }
    catch(error){
        console.error('Error syncing products to Algolia:', error);
    }
}

// module.exports = { syncProductsToAlgolia };

syncProductsToAlgolia();

const SYNC_INTERVAL_MS = 15 * 60 * 1000; // 15 минут
setInterval(syncProductsToAlgolia, SYNC_INTERVAL_MS);