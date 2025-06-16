const express = require('express');
const router = express.Router();
const { loginUser, registerUser, validateToken,
    userDataByToken, recoverAccount, verifyRecoverAccount,
    changeUserPassword
} = require('./controllers/api-auth-controllers');
const {
    getProducts, getProductPage
} = require('./controllers/api-product-controller');
//auth
router.post('/api/login', loginUser);
router.post('/api/register', registerUser);
router.post('/api/validateToken',validateToken);
router.post('/api/userdata', userDataByToken);
router.post('/api/account-recover', recoverAccount);
router.post('/api/account-recover-code', verifyRecoverAccount);
router.post('/api/changePassword', changeUserPassword);
//products
router.get('/api/products', getProducts);
router.get('/api/product/:productId', getProductPage);

module.exports = router;