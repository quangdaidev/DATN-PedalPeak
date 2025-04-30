import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  createCategory,
  getCategories,
  getCategoriesCount,
  uploadImages,
  getSubCategoriesCount,
  getCategory,
  deleteCategory,
  updatedCategory,
  removeImageFromCloudinary,
  sortBy,
  searchProductController,
  updatedStatus
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/uploadImages",upload.array("images"),uploadImages);
categoryRouter.post("/create", createCategory);
categoryRouter.post('/sortBy', sortBy);
categoryRouter.post('/search/get', searchProductController);
categoryRouter.get("/", getCategories);
categoryRouter.get("/get/count", auth, getCategoriesCount);
categoryRouter.get("/get/count/subCat", auth, getSubCategoriesCount);
categoryRouter.get("/:id",getCategory);
categoryRouter.delete("/deleteImage", removeImageFromCloudinary);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.put("/:id", updatedCategory);
categoryRouter.put("/updateStatus/:id", updatedStatus);

export default categoryRouter;
