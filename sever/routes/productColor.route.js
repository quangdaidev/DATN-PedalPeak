import { Router } from "express";

import { addProductColorController,deleteProductColor,getProductColor } from "../controllers/productColor.controller.js";

const productColorRouter = Router();
productColorRouter.post('/add',addProductColorController);
productColorRouter.delete("/:id", deleteProductColor);
productColorRouter.get('/:id',getProductColor);


export default productColorRouter