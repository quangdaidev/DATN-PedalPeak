import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddressController, deleteAddressController, getAddressController, selectAddressController,getSingleAddressController,editAddress } from "../controllers/address.controller.js";

const addressRouter = Router();
addressRouter.post('/add',auth,addAddressController);
addressRouter.get('/get',auth,getAddressController);
addressRouter.get('/:id',auth,getSingleAddressController);
addressRouter.put('/selectAddress/:id',auth,selectAddressController);
addressRouter.delete('/:id',deleteAddressController);
addressRouter.put('/:id',auth,editAddress);

export default addressRouter