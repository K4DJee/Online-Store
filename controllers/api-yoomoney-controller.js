"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var yoo_checkout_1 = require("@a2seven/yoo-checkout");
require('dotenv').config();
var checkout = new yoo_checkout_1.YooCheckout({ shopId: process.env.YooMoneyShopId, secretKey: process.env.YooMoneySecretKey });
var uuidv4 = require('uuid').v4;
var JWT_SECRET = process.env.JWT_SECRET;
var jwt = require('jsonwebtoken');
var capturePayload = {
    amount: {
        value: '2.00',
        currency: 'RUB'
    }
};
var createPayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, authHeader, token, decoded, num, amountValue, idempotenceKey, createPayload, payment, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                amount = req.body.amount;
                if (!amount) {
                    return [2 /*return*/, res.status(400).json({ message: 'Wrong data', success: false })];
                }
                authHeader = req.headers['authorization'];
                if (!authHeader) {
                    return [2 /*return*/, res.status(400).json({ message: 'Token required', success: false })];
                }
                token = authHeader.split(' ')[1];
                if (!token) {
                    return [2 /*return*/, res.status(400).json({ message: 'Token required', success: false })];
                }
                decoded = jwt.verify(token, JWT_SECRET);
                if (!decoded || !decoded.userId) {
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid token', success: false })];
                }
                num = parseFloat(amount);
                amountValue = num.toFixed(2);
                idempotenceKey = uuidv4();
                createPayload = {
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
                    metadata: {
                        userId: decoded.userId
                    }
                };
                return [4 /*yield*/, checkout.createPayment(createPayload, idempotenceKey)];
            case 1:
                payment = _a.sent();
                console.log(payment);
                if (payment.confirmation.confirmation_url) {
                    console.log('paymentUrl: ', payment.confirmation.confirmation_url);
                    return [2 /*return*/, res.status(200).json({ message: 'Успешно создан платёж', success: true, confirmation_url: payment.confirmation.confirmation_url })];
                }
                return [2 /*return*/, res.status(500).json({ message: 'Ошибка создания платежа', success: false })];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ message: 'Internal Server Error', success: false });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var capturePayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentId, idempotenceKey, payment, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                paymentId = req.body.paymentId;
                idempotenceKey = uuidv4();
                return [4 /*yield*/, checkout.capturePayment(paymentId, capturePayload, idempotenceKey)];
            case 1:
                payment = _a.sent();
                console.log(payment);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.send(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getPaymentInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentId, payment, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                paymentId = req.params.paymentId;
                return [4 /*yield*/, checkout.getPayment(paymentId)];
            case 1:
                payment = _a.sent();
                console.log(payment);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.send(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var cancelPayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paymentId, idempotenceKey, payment, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                paymentId = req.body.paymentId;
                idempotenceKey = uuidv4();
                return [4 /*yield*/, checkout.cancelPayment(paymentId, idempotenceKey)];
            case 1:
                payment = _a.sent();
                console.log(payment);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.send(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getPaymentList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, paymentList, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filters = { created_at: { value: '2021-01-27T13:58:02.977Z', mode: 'gte' }, limit: 20 };
                return [4 /*yield*/, checkout.getPaymentList(filters)];
            case 1:
                paymentList = _a.sent();
                console.log(paymentList);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.send(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createRefundPayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var createRefundPayload, idempotenceKey, refund, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                createRefundPayload = {
                    payment_id: '27a3852a-000f-5000-8000-102d922df8db',
                    amount: {
                        value: '1.00',
                        currency: 'RUB'
                    }
                };
                idempotenceKey = uuidv4();
                return [4 /*yield*/, checkout.createRefund(createRefundPayload, idempotenceKey)];
            case 1:
                refund = _a.sent();
                console.log(refund);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                res.send(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getRefundInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refundId, refund, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                refundId = req.body.refundId;
                return [4 /*yield*/, checkout.getRefund(refundId)];
            case 1:
                refund = _a.sent();
                console.log(refund);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error(error_7);
                res.send(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getRefundList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, refundList, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filters = { created_at: { value: '2021-01-27T13:58:02.977Z', mode: 'gte' }, limit: 20 };
                return [4 /*yield*/, checkout.getRefundList(filters)];
            case 1:
                refundList = _a.sent();
                console.log(refundList);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error(error_8);
                res.send(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createReceipt = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var createReceiptPayload, idempotenceKey, receipt, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                createReceiptPayload = {
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
                idempotenceKey = uuidv4();
                return [4 /*yield*/, checkout.createReceipt(createReceiptPayload, idempotenceKey)];
            case 1:
                receipt = _a.sent();
                console.log(receipt);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.error(error_9);
                res.send(error_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getReceiptInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var receiptId, receipt, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                receiptId = req.body.receiptId;
                return [4 /*yield*/, checkout.getReceipt(receiptId)];
            case 1:
                receipt = _a.sent();
                console.log(receipt);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.error(error_10);
                res.send(error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getReceiptList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filters, receiptList, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filters = { created_at: { value: '2021-01-27T13:58:02.977Z', mode: 'gte' }, limit: 20 };
                return [4 /*yield*/, checkout.getReceiptList(filters)];
            case 1:
                receiptList = _a.sent();
                console.log(receiptList);
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                console.error(error_11);
                res.send(error_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    createPayment: createPayment,
    capturePayment: capturePayment,
    getPaymentInfo: getPaymentInfo,
    cancelPayment: cancelPayment,
    getPaymentList: getPaymentList,
    createRefundPayment: createRefundPayment,
    getRefundInfo: getRefundInfo,
    getRefundList: getRefundList,
    createReceipt: createReceipt,
    getReceiptInfo: getReceiptInfo,
    getReceiptList: getReceiptList
};
