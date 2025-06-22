const express = require('express');
const router = express.Router();
const { loginUser, registerUser, validateToken,
    userDataByToken, recoverAccount, verifyRecoverAccount,
    changeUserPassword
} = require('./controllers/api-auth-controllers');
const {
    getProducts, getProductPage
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

} = require('./controllers/api-seller-controller');
//auth
router.post('/api/login', loginUser);
router.post('/api/register', registerUser);
router.post('/api/validateToken', validateToken);
router.post('/api/userdata', userDataByToken);
router.post('/api/account-recover', recoverAccount);
router.post('/api/account-recover-code', verifyRecoverAccount);
router.post('/api/changePassword', changeUserPassword);
//products
router.get('/api/products', getProducts);
router.get('/api/product/:productId', getProductPage);
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
module.exports = router;