import { YooCheckout, ICreatePayment, ICapturePayment, IGetPaymentList, ICreateRefund,
    IGetRefundList, ICreateReceipt, IGetReceiptList
  } from '@a2seven/yoo-checkout';
require('dotenv').config();

const checkout = new YooCheckout({ shopId: process.env.YooMoneyShopId!, secretKey: process.env.YooMoneySecretKey! });
const { v4: uuidv4 } = require('uuid');
const JWT_SECRET = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');


const capturePayload: ICapturePayment = {
    amount: {
        value: '2.00',
        currency: 'RUB'
    }

};

const createPayment = async(req,res)=>{
    try {
        const {amount} = req.body;
        if(!amount){
            return res.status(400).json({message:'Wrong data', success:false});
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

        const num = parseFloat(amount);
        const amountValue = num.toFixed(2);
        const idempotenceKey = uuidv4();

        const createPayload: ICreatePayment = {
            amount: {
                value: amountValue,
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card'
            },
            confirmation: {
                type: 'redirect',
                return_url: 'https://k4dje-frontend.site'
            },
            capture: true,
            receipt: {
                customer: {
                    email: 'test@gmail.com'
                },
                items: [
                    {
                        description: 'Товар 1',
                        quantity: '1',
                        amount: {
                            value: amountValue,
                            currency: 'RUB'
                        },
                        vat_code: 1
                    }
                ]
            },
            metadata:{
                userId: decoded.userId
            }
        
        };

        const payment = await checkout.createPayment(createPayload, idempotenceKey);
        console.log(payment);
        if(payment.confirmation.confirmation_url){
        console.log('paymentUrl: ', payment.confirmation.confirmation_url)
        return res.status(200).json({message:'Успешно создан платёж', success:true, confirmation_url:payment.confirmation.confirmation_url})
        }
        return res.status(500).json({message:'Ошибка создания платежа', success:false})
      } catch (error) {
        console.error(error);
        res.status(500).json({message:'Internal Server Error', success:false})
      }
}

const capturePayment = async(req,res)=>{
    try{
        const {paymentId} = req.body;
        const idempotenceKey = uuidv4();
        const payment = await checkout.capturePayment(paymentId, capturePayload, idempotenceKey);
        console.log(payment);
    }
    catch(error){
        console.error(error);
        res.send(error) 
    }
}

const getPaymentInfo = async(req,res)=>{
    try{
        const {paymentId} = req.params;
        const payment = await checkout.getPayment(paymentId);
        console.log(payment);
    }
    catch(error){
        console.error(error);
        res.send(error) 
    }
}

const cancelPayment = async(req,res)=>{
    try{
        const {paymentId} = req.body;
        const idempotenceKey = uuidv4();
        const payment = await checkout.cancelPayment(paymentId, idempotenceKey);
        console.log(payment);
    }
    catch(error){
        console.error(error);
        res.send(error) 
    }
}

const getPaymentList = async(req,res)=>{
    try{
        const filters: IGetPaymentList = { created_at: { value: '2021-01-27T13:58:02.977Z', mode: 'gte' },  limit: 20 };
        const paymentList = await checkout.getPaymentList(filters);
        console.log(paymentList);
    }
    catch(error){
        console.error(error);
        res.send(error) 
    }
}

const createRefundPayment = async(req,res)=>{
    try{
        const createRefundPayload: ICreateRefund = {
            payment_id: '27a3852a-000f-5000-8000-102d922df8db',
            amount: {
                value: '1.00',
                currency: 'RUB'
            }
        };
        const idempotenceKey = uuidv4();
        const refund = await checkout.createRefund(createRefundPayload, idempotenceKey);
        console.log(refund)
    }
    catch(error){
        console.error(error);
        res.send(error) 
    }
}

const getRefundInfo = async(req,res)=>{
    try{
       const {refundId} = req.body;
       const refund = await checkout.getRefund(refundId);
       console.log(refund)
    }
    catch(error){
        console.error(error);
        res.send(error) 
    }
}

const getRefundList = async(req,res)=>{
    try{
        const filters: IGetRefundList = { created_at: { value: '2021-01-27T13:58:02.977Z', mode: 'gte' },  limit: 20 };
        const refundList = await checkout.getRefundList(filters);
        console.log(refundList)
     }
     catch(error){
         console.error(error);
         res.send(error) 
     }
}

const createReceipt = async(req,res)=>{
    try{
        const createReceiptPayload: ICreateReceipt = {
            send: true,
            customer: {
                email: 'test@gmail.com'
            },
            settlements: [
                {
                    type: 'cashless',
                    amount: {
                        value: '2.00',
                        currency: 'RUB'
                    }
                }
            ],
            refund_id: '27a387af-0015-5000-8000-137da144ce29',
            type: 'refund',
            items: [
                {
                    description: 'test',
                    quantity: '2',
                    amount: {
                        value: '1.00',
                        currency: 'RUB'
                    },
                    vat_code: 1,
                }
            ]
        };
        const idempotenceKey = uuidv4();
        const receipt = await checkout.createReceipt(createReceiptPayload, idempotenceKey);
        console.log(receipt)
     }
     catch(error){
         console.error(error);
         res.send(error) 
     }
}

const getReceiptInfo = async(req,res)=>{
    try{
    const {receiptId} = req.body;
    const receipt = await checkout.getReceipt(receiptId);
    console.log(receipt)
    }
    catch(error){
        console.error(error);
        res.send(error) 
    }
}

const getReceiptList = async(req,res)=>{
    try{
    const filters: IGetReceiptList = { created_at: { value: '2021-01-27T13:58:02.977Z', mode: 'gte' },  limit: 20 };
    const receiptList = await checkout.getReceiptList(filters);
    console.log(receiptList)
    }
    catch(error){
        console.error(error);
        res.send(error) 
    }
}

module.exports = {
    createPayment, capturePayment, getPaymentInfo, 
    cancelPayment, getPaymentList, createRefundPayment, 
    getRefundInfo, getRefundList, createReceipt, getReceiptInfo,
    getReceiptList
}
