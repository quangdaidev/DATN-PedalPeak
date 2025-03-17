import { Router } from "express";
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { uploadImages, createProduct, deleteProduct, getAllFeaturedProducts, 
    getAllProducts, getAllProductsByCatId, getAllProductsByCatName, 
    getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatName, 
    getAllProductsByThirdLavelCatId, getAllProductsByThirdLavelCatName, 
    getProduct, getProductsCount, removeImageFromCloudinary, updateProduct, 
 } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/uploadImages',auth,upload.array('images'),uploadImages);
productRouter.post('/create',auth,createProduct);
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getAllProductsByCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName',getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsBySubCatName',getAllProductsBySubCatName);
productRouter.get('/getAllProductsByThirdLavelCat/:id',getAllProductsByThirdLavelCatId);
productRouter.get('/getAllProductsByThirdLavelCatName',getAllProductsByThirdLavelCatName);
productRouter.get('/getAllProductsByPrice',getAllProductsByPrice);
productRouter.get('/getAllProductsByRating',getAllProductsByRating);
productRouter.get('/getAllProductsCount',getProductsCount);
productRouter.get('/getAllFeaturedProducts',getAllFeaturedProducts);
productRouter.delete('/:id',deleteProduct);
productRouter.get('/:id',getProduct);
productRouter.delete('/deleteImage',auth,removeImageFromCloudinary);
productRouter.put('/updateProduct/:id',auth,updateProduct); 

export default productRouter;