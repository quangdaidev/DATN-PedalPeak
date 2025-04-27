
import { Router } from "express";
import auth from "../middlewares/auth.js";
import { createOrderController, getOrderDetailsController,getAllOrders, updatedOrder,sortBy,searchOrderController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post('/sortBy', sortBy);
orderRouter.post('/search/get', searchOrderController);
orderRouter.post('/create',auth, createOrderController) ;
orderRouter.get("/order-list",auth,getOrderDetailsController);
orderRouter.get('/getAllOrders',getAllOrders);
orderRouter.put("/:id", updatedOrder);

export default orderRouter;
