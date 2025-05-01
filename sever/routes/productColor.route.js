import { Router } from "express";

import { addProductColorController,deleteProductColor } from "../controllers/productColor.controller.js";

const productColorRouter = Router();
productColorRouter.post('/add',addProductColorController);
productColorRouter.delete("/:id", deleteProductColor);


export default productColorRouter