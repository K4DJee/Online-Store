const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const NGROK_DOMEN = process.env.NGROK_DOMEN;
require('dotenv').config();


const createTopUpSession = async(req,res) => {
    try{
        const {amount} = req.body;
        console.log(amount);
        if (!amount  || amount <= 50) {
            return res.status(400).json({
                success: false,
                message: 'Укажите корректную сумму пополнения',
            });
        }

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token required',
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({success: false,message: 'Invalid token'});
        }

        const userId = decoded.userId;
        const amountInCents = Math.round(amount * 0.011 * 100);
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${NGROK_DOMEN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${NGROK_DOMEN}/cancel`,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Пополнение баланса',
                    },
                    unit_amount: amountInCents,
                },
                quantity: 1,
            }],
            client_reference_id: userId.toString(),
            metadata: {
                userId,
                type: 'topup',
                amount: amountInCents,
            }
        });

        return res.json({ success: true, sessionId: session.id, url:session.url });
    }
    catch(error){
        console.error('Ошибка в createTopUpSession:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Не удалось создать сессию оплаты',
        });
    }
}


module.exports = {
    createTopUpSession
}