require('dotenv').config();
const crypto = require('crypto');
const  {
    refillUserBalanceSQL
} = require('./models/balance')
const { YooCheckout} = require('@a2seven/yoo-checkout');
const checkout = new YooCheckout({ shopId: process.env.YooMoneyShopId, secretKey: process.env.YooMoneySecretKey });

async function verifyYooKassaSignature(req, res, secretKey) {
   // 1. Получаем подпись из заголовка
   const signatureHeader = req.headers['signature'] || req.headers['x-yookassa-signature'];
    console.log('signatureHeader--------:',signatureHeader);
   if (!signatureHeader) {
       console.error('Подпись отсутствует в заголовках');
       return false;
   }

   // 2. Если заголовок — массив, берем первый элемент
   const signature = Array.isArray(signatureHeader) ? signatureHeader[0] : signatureHeader;
   console.log('signature ---------------:',signature)
   // 3. Убираем префикс "v1 ..."
   const signatureValue = signature.split(' ').slice(2).join(' ');
   console.log('signatureValue---------:',signatureValue);
   // 4. Декодируем подпись
   let receivedSignature;
   try {
       receivedSignature = Buffer.from(signatureValue, 'base64');
       console.log('receivedSignature-------------:',receivedSignature)
   } catch (e) {
       console.error('Ошибка при декодировании подписи:', e.message);
       return false;
   }

   // 5. Получаем raw body (как Buffer) и преобразуем в строку
   const rawBody = req.body.toString('utf8');
   console.log('rawBody----------:',rawBody)
   // 6. Генерируем хэш
   const calculatedHash = crypto.createHmac('sha256', secretKey)
       .update(rawBody)
       .digest(); // возвращает Buffer

    console.log('calculatedHash----------:',calculatedHash);
   // 7. Проверяем длины
   if (receivedSignature.length !== calculatedHash.length) {
        console.log(receivedSignature);
        console.log(calculatedHash)
       console.error('Длины подписей не совпадают');
       return false;
   }

   // 8. Проверяем подпись
   return crypto.timingSafeEqual(receivedSignature, calculatedHash);
}

const yookassaWebhook = async(req,res)=>{
    try{
        const event = JSON.parse(req.body.toString());
        console.log(event)
        switch(event.event){
            case 'payment.succeeded':
            var payment = event.object;
            var paymentId = payment.id;
            var amount = payment.amount.value;
            var userId = payment.metadata.userId; // Извлекаем ID пользователя
            const paymentInfo = await checkout.getPayment(paymentId);
            console.log('paymentInfo:',paymentInfo)
            if(paymentInfo.status === 'succeeded'){
            const refillResult = await refillUserBalanceSQL(userId, amount);
            if (refillResult.success) {
                console.log(`Баланс пользователя #${userId} успешно пополнен на ${amount}`);
                console.log(`Платёж #${paymentId} успешно завершён`);
                return res.status(200).json({message:`Баланс пользователя успешно пополнен на ${amount}`, success:true})
            } else {
                return res.status(500).json({message:`Не удалось пополнить баланс пользователя`, success:false})
            }
            }
            else{
                return res.status(200).json({message:'Такого платежа не существует', success:false});
            }
            break;

            case 'payment.canceled':
            var payment = event.object;
            var paymentId = payment.id;
            console.log(`Платёж #${paymentId} отменён`);
            res.status(200).json({message:`Платёж #${paymentId} отменён`})
            break;
            default:
            console.log(`Неизвестное событие: ${event.type}`);
            res.status(200).end(); // Для неизвестных событий тоже отправляем ответ
            break;
        }
    }   
    catch(error){
        res.status(500).json({message:'Internal Server Error', success:false});
        console.error('error: ',error.message);
    }
}

module.exports = {
    yookassaWebhook
}