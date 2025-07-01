const express = require('express');
const router = express.Router();
const { loginUser, registerUser, validateToken,
    userDataByToken, recoverAccount, verifyRecoverAccount,
    changeUserPassword, deleteUserAccount, generateCodeForUserEmail, 
    verifyCodeForChangeUserEmail, changeUserEmail
} = require('./controllers/api-auth-controllers');
const {
    getProducts, getProductPage,
    buyProduct
} = require('./controllers/api-product-controller');

const { 
    newProductReview, allProductReviews, allUserReviews, averageProductRating,
    deleteUserReview, changeReviewContent
} = require('./controllers/api-reviews-controller');
const {
    addProductInCart, changeQuantityProductsInCart, deleteProductInCart, 
    getProductsFromCart
} = require('./controllers/api-carts-controller');
const {
    createBecomeSeller, loginSeller, sellerData, validateSellerToken,
    addProductBySeller, getAllSellerProducts, changeProductInfoBySeller,
    deleteProductBySeller, deleteSellerAccount, changeSalePriceBySeller
} = require('./controllers/api-seller-controller');
const {
    refillUserBalance, getSellerBalance
} = require('./controllers/api-balance-controller');
const {
    getUserTransactions, getSellerTransactions
} = require('./controllers/api-transaction-controller');
const {
    getUserPurchases
} = require('./controllers/api-purchase-controller');
const {
    getAllProductCategories
} = require('./controllers/api-category-controller');
const {
    addToFavorite, getAllProductsInFavorite
} = require('./controllers/api-favourite-controller');
const {
    receiveShippingProduct, getAllShippingProducts
} = require('./controllers/api-shipping-controller');
//auth
router.post('/api/login', loginUser);
router.post('/api/register', registerUser);
router.post('/api/validateToken', validateToken);
router.post('/api/userdata', userDataByToken);
router.post('/api/account-recover', recoverAccount);
router.post('/api/account-recover-code', verifyRecoverAccount);
router.post('/api/changePassword', changeUserPassword);
router.delete('/api/user/deleteAccount', deleteUserAccount);//new
router.post('/api/1/changeUserEmail', generateCodeForUserEmail);//new
router.post('/api/2/changeUserEmail', verifyCodeForChangeUserEmail);//new
router.put('/api/3/changeUserEmail', changeUserEmail);//new
//products
router.get('/api/products', getProducts);
router.get('/api/product/:productId', getProductPage);
router.post('/api/buyProduct', buyProduct);
//reviews
router.post('/api/product/:productId/create-review', newProductReview);
router.get('/api/user-reviews', allUserReviews);
router.get('/api/product/:productId/reviews',allProductReviews);
router.get('/api/product/:productId/rating', averageProductRating);
router.delete('/api/delete-user-review', deleteUserReview);
router.put('/api/change-review', changeReviewContent);
//carts
router.post('/api/add-product-cart', addProductInCart);
router.get('/api/cart', getProductsFromCart);
router.put('/api/change-product-cart', changeQuantityProductsInCart);
router.delete('/api/delete-product-cart', deleteProductInCart);
//seller
router.post('/api/auth/login/seller',loginSeller);
router.post('/api/auth/register/seller', createBecomeSeller);
router.post('/api/auth/sellerData', sellerData);
router.post('/api/auth/validateSellerToken', validateSellerToken);
router.post('/api/createNewProduct', addProductBySeller);
router.get('/api/getSellerProducts', getAllSellerProducts);
router.put('/api/changeProductInfo',changeProductInfoBySeller);
router.delete('/api/deleteProduct', deleteProductBySeller);
router.delete('/api/seller/deleteAccount', deleteSellerAccount);//new
router.put('/api/changeSalePrice', changeSalePriceBySeller);//new
//balance 
router.post('/api/refillBalance',refillUserBalance);
router.get('/api/sellerBalance', getSellerBalance);
//transactions
router.get('/api/user/transactions', getUserTransactions);//new
router.get('/api/seller/transactions', getSellerTransactions);//new
//purchases
router.get('/api/purchases', getUserPurchases);//new
//category
router.get('/api/allCategories', getAllProductCategories);//new
//favourite
router.post('/api/addToFavourite', addToFavorite);//new
router.get('/api/favourite', getAllProductsInFavorite);//new
//shipping
router.get('/api/shippings', getAllShippingProducts);//new
router.put('/api/receiveProduct', receiveShippingProduct);//new
module.exports = router;