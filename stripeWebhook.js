const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
require('dotenv').config();

const {refillUserBalanceSQL} = require('./models/balance');

const stripeWebhook = async(req,res)=>{
    try{
        console.log('Webhook started');
        const payload = req.body;
        let event;
        if (endpointSecret) {
            const signature = req.headers['stripe-signature'];
                event = stripe.webhooks.constructEvent(
                    payload,
                    signature,
                    endpointSecret
                ) 
        }
        
        // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Session object:', JSON.stringify(session, null, 2));
        if (session.client_reference_id && session.metadata.type === 'topup') {
            const userId = parseInt(session.client_reference_id);
            const amount = parseInt(session.metadata.amount) / 100;
            try {
                const refillResult = await refillUserBalanceSQL(userId, amount);
    
                if (refillResult.affectedRows > 0) {
                    console.log(`Баланс пользователя #${userId} успешно пополнен на $${amount}`);
                    console.log('User balance updated successfully');
                } else {
                    console.warn(`Не удалось пополнить баланс пользователя #${userId}`);
                    console.log('User balance not updated');
                }
            } catch (err) {
                console.error(`Ошибка при пополнении баланса: ${err.message}`);
            }
        }
    break;
    case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
    break;
    case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log('PaymentMethod attached:', paymentMethod.id);
    break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  res.send();
  console.log('Webhook finished');
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json({message:'Internal Server Error', success:false});
    }
}


module.exports = {
    stripeWebhook
}