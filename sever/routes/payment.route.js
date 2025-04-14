import { Router } from "express";
const paymentRouter = Router();

import { payment, paymentId, paymentReturn } from "../controllers/payment.controller.js";

paymentRouter.post('/create_payment_url',payment);
paymentRouter.get('/vnpay_return',paymentReturn);
paymentRouter.get('/vnpay_ipn',paymentId)

export default paymentRouter;