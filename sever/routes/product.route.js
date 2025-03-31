import { Router } from "express";
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { uploadImages, createProduct, deleteProduct, getAllFeaturedProducts, 
    getAllProducts, getAllProductsByCatId, getAllProductsByCatName, 
    getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatName, 
    getAllProductsByThirdLavelCatId, getAllProductsByThirdLavelCatName, 
    getProduct, getProductsCount, removeImageFromCloudinary, updateProduct,
    deleteMultipleProduct,
    createProductColor,
    deleteProductColor,
    updateProductColor,
    deleteMultipleProductColor,
    getProductColor,
    getProductColorById, 
 } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/uploadImages',upload.array('images'),uploadImages);
productRouter.post('/create',createProduct);
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
productRouter.delete('/deleteImage',removeImageFromCloudinary);
productRouter.delete('/:id',deleteProduct);
productRouter.delete('/deleteMultiple',deleteMultipleProduct);
productRouter.get('/:id',getProduct);
productRouter.put('/updateProduct/:id',updateProduct); 

productRouter.post('/productColor/create', auth, createProductColor);
productRouter.delete('/productColor/:id', deleteProductColor);
productRouter.put('/productColor/:id', auth, updateProductColor);
productRouter.delete('/productColor/deleteMultipleRams', deleteMultipleProductColor);
productRouter.get('/productColor/get', getProductColor);
productRouter.get('/productColor/:id', getProductColorById);


export default productRouter;