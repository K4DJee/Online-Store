require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const transporter = require('../mail');
const nodemailer = require('nodemailer');
const recoveryCodes = require('../storage.js');
const {
    loginUserSQL, comparePassword, registerUserSQL, 
    findUserByIdSQL, createUserBalanceSQL, findUserSQL,
    getBalanceByIdSQL, checkExistSQL, changePassUserSQL,
    deleteUserAccountSQL, changeUserEmailSQL,
    getUserPageInfoSQL
} = require('../models/user');




const loginUser  = async(req,res)=>{
    try{
        const user = req.body;
        console.log(user);
        if(!user.username || !user.email || !user.password || !user.regDate || !user.role){
            console.log('Wrong user data!');
            return res.status(400).json({message:'Wrong user data! All fields required.', success:false});
        }
        const user_db = await loginUserSQL(user.username, user.email);
        if(!user_db[0]){
            return res.status(404).json({message:'User not found'});
        }
        const isPasswordValid = await comparePassword(user.password, user_db[0].password);
        if(!isPasswordValid){
            return res.status(401).json({message:'Wrong user password'});
        }
        if(user_db.length > 0 && isPasswordValid){
            const token = jwt.sign({userId:user_db[0].userId, username:user_db[0].username}, JWT_SECRET, {expiresIn:'123h'});
            console.log('Succsess login user. His token: ', token);
            return res.status(200).json({token});
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

const registerUser = async(req,res)=>{
    try{
        const user = req.body;
        if(!user.username || !user.email || !user.password || !user.regDate || !user.role || !user.consent){
            console.log('Wrong user data!');
            return res.status(400).json({message:'Wrong user data! All fields required.'});
        }
    // Проверяем, существует ли такой пользователь
    const existingUser = await findUserSQL(user.username, user.email);
    if (existingUser.length > 0) {
        return res.status(401).json({ message: 'Username or email already exists' });
    }
    const user_db = await registerUserSQL(user.username, user.email, user.password, user.role, user.consent);
        const token = jwt.sign({userId:user_db.insertId, username:user.username}, JWT_SECRET, {expiresIn:'3h'});
        console.log('Succsess registered user. His token: ', token);
        if(!user_db.insertId){
            return res.status(500).json({message:'Ошибка создания баланса'});
        }
        const balance = await createUserBalanceSQL(user_db.insertId);
        console.log('balance row: ', balance);
        return res.status(200).json({token});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error', success:false});
    }
}

const validateToken =  async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ valid: false, message: 'Token is required' });
        }
        else{
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
            }
            else{
                res.status(200).json({ valid: true, user: decoded });
            }
        });
        }
    } catch (error) {
        console.error('Error validating token:', error.message);
        res.status(500).json({ valid: false, message: 'Server error' });
    }
};

    const userDataByToken =  async (req,res)=>{
    try{
        const token = req.body.token;
        if(!token){
            return res.status(400).json({message:'No token provided'});
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token'});
        }
        
        const user_db = await findUserByIdSQL(decoded.userId);
        const { password, ...safeUser } = user_db[0];
        const balance = await getBalanceByIdSQL(decoded.userId);
        if(!balance[0]){
            return res.status(404).json({message:'Balance not found'});
        }
        if(!user_db[0]){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({...safeUser, balance:balance[0].amount});
    }
    catch(error){
        console.error('Error fetching user data:', error.message);
        res.status(500).json({ message: 'Server error', success:false});
    }
};


const recoverAccount = async(req,res)=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(403).json({message:'email required', valid:false});
        }
        const valid_user = await checkExistSQL(email);
        if(valid_user.length > 0){
            const code = Math.floor(100000 + Math.random() * 900000);//Generate 6 symbols code
            const expiresAt = Date.now() + 5 * 60 * 1000;// 5 minutes expires
            recoveryCodes.set(code.toString(), { email, expiresAt });
                const info = await transporter.sendMail({
                from: '"KLANSHOP" <klanshopk4dje@mail.ru>',
                to: `${email}`,
                subject: "Recover account password",
                text: "Сгенерированный код:  2323323. Вам нужно ввести его для восстановления пароля",
                html: `<b>Сгенерированный код:  ${code}. Вам нужно ввести его для восстановления пароля</b>` // html body
                });
                console.log("Message sent: %s", info.messageId);
                if(!info.messageId){
                    return res.status(500).json({message:'Send error'});
                }
            return res.status(200).json({valid:true});
        }
        else{
            return res.status(401).json({message:'This email not exist', valid:false});
        }
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({message:'Internal Server Error', success:false});
    }

}

const verifyRecoverAccount = async(req,res)=>{
    try{
        const {codeObject} = req.body
        const email = codeObject.email;
        const code = codeObject.code;
        if(!email || !code){
            console.log('email or code empty');
            return res.status(400).json({message: 'email or code emppty', valid:false});
        }
        else{
            const entry = recoveryCodes.get(code);
            console.log(code);
            if(!entry){
            return res.status(401).json({message:'Invalid or expired code', valid:false});
            }
            if (Date.now() > entry.expiresAt) {
                recoveryCodes.delete(code); // Очистка просроченного кода
                return res.status(419).json({ message: 'Code has expired', valid: false });
            }
            const recover_token = jwt.sign({email:email}, JWT_SECRET, {expiresIn:'1h'});
            recoveryCodes.delete(code);//delete success code
            return res.status(200).json({message: 'success', valid:true, recover_token:recover_token});
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

    const changeUserPassword = async(req,res)=>{
    try{
        const {password, token} = req.body;
        var email = '';
    if(!password && !token){
        console.log('password or recover_token required');
        return res.status(400).json({message:'Password required', valid:false});
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
        }
        email = decoded.email;
    });
    const user = await changePassUserSQL(password, email);
    if(!user.affectedRows === 0){
        console.log('Пользователь не найден с таким email');
        return res.status(404).json({message:'User not found', valid:false});
    }
    else{
        console.log('success change password');
        res.status(200).json({message:'Success change password', valid:true});
    }
    }
    catch(error){
        console.error(error.message);
    }
}

const generateCodeForUserEmail = async (req,res)=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({message:'email required', valid:false});
        }
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        const valid_user = await checkExistSQL(email);
        if(valid_user.length > 0){
            const code = Math.floor(100000 + Math.random() * 900000);//Generate 6 symbols code
            const expiresAt = Date.now() + 5 * 60 * 1000;// 5 minutes expires
            recoveryCodes.set(code.toString(), { email, expiresAt });
                const info = await transporter.sendMail({
                from: '"KLANSHOP" <klanshopk4dje@mail.ru>',
                to: `${email}`,
                subject: "Смена почты аккаунта",
                text: "Сгенерированный код для смены почты.",
                html: `
                <b>Сгенерированный код:  ${code}. Вам нужно ввести его для смены почты</b>
                <b>Не присылайте его никому!🤫</b>
                ` // html body
                });
                console.log("Message sent: %s", info.messageId);
                if(!info.messageId){
                    return res.status(500).json({message:'Send error', success:false});
                }
            return res.status(200).json({success:true, message:'Код был успешно отправлен'});
        }
        else{
            return res.status(404).json({message:'This email not exist', success:false});
        }
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false}); 
    }
};

const verifyCodeForChangeUserEmail = async(req,res)=>{
    try{
        const {code} = req.body;
        if(!code){
            return res.status(400).json({message: 'code empty', success:false});
        }
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        const entry = recoveryCodes.get(code);
        if(!entry){
        return res.status(401).json({message:'Invalid or expired code', success:false});
        }
        if (Date.now() > entry.expiresAt) {
            recoveryCodes.delete(code); // Очистка просроченного кода
            return res.status(419).json({ message: 'Code has expired', success: false });
        }
        recoveryCodes.delete(code);//delete success code
        const changeToken = jwt.sign({userId:decoded.userId, action:'changeEmail'}, JWT_SECRET, {expiresIn:'5min'})
        if(!changeToken){
            res.status(500).json({message:'Ошибка создания токена', success:false});
        }
        return res.status(200).json({message: 'Success verify code', success:true, changeToken:changeToken});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}

const changeUserEmail = async(req,res)=>{
    try{
        const {newEmail, changeToken} = req.body;
        if(!newEmail || !changeToken){
            return res.status(400).json({message:'email required', success:false});
        }
        const decoded = jwt.verify(changeToken,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }

        const changeUserEmailRow = await changeUserEmailSQL(newEmail, decoded.userId);
        if(changeUserEmailRow.affectedRows === 0){
            return res.status(500).json({message:'Ошибка смены почты',success:false})
        }
        return res.status(200).json({message:'Успешная смена почты аккаунта', success:true});
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false}); 
    }
}

const deleteUserAccount = async (req,res)=>{
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(400).json({message:'Token required', success:false}); 
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded || !decoded.userId){
            return res.status(401).json({message:'Invalid token', success:false});
        }
        const deleteUserAccountRow = await deleteUserAccountSQL(decoded.userId);
        if(deleteUserAccountRow.affectedRows === 0 || !deleteUserAccountRow){
            return res.status(500).json({message:'Ошибка удаления аккаунта', success:false});
        }
        return res.status(200).json({message:'Аккаунт удалён', success:true});
    }
    catch(error){
        console.error('Error validating token:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getUserPageInfo = async(req,res)=>{
    try{
        const { username} = req.params;
        if(!username){
            return res.status(400).json({message:'Wrong data. Username required', success:false});
        }
        const userPageInfoRow = await getUserPageInfoSQL(username);
        if(!userPageInfoRow){
            return res.status(404).json({message:'Пользователь не найден', success:false});
        }
        return res.status(200).json({message:'Пользователь успешно был найден', success:true,userPageInfo:userPageInfoRow})
    }
    catch(error){
        console.error('Error validating token:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    loginUser, registerUser, validateToken, userDataByToken,
    recoverAccount, verifyRecoverAccount, changeUserPassword,
    deleteUserAccount, generateCodeForUserEmail, verifyCodeForChangeUserEmail,
    changeUserEmail, getUserPageInfo
    };