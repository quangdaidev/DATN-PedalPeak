
import { Router } from "express";
import auth from "../middlewares/auth.js";
import { createOrderController, getOrderDetailsController,getAllOrders, updatedOrder } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post('/create',auth, createOrderController) ;
orderRouter.get("/order-list",auth,getOrderDetailsController);
orderRouter.get('/getAllOrders',getAllOrders);
orderRouter.put("/:id", updatedOrder);

export default orderRouter;
