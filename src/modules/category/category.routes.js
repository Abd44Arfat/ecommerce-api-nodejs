
import { Router } from "express";
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { uploadSinleFile } from "../../fileUpload/fileUpload.js";
import { Validate } from "../../middleware/validate.js";
import { addCategoryValidation } from "./category.validation.js";
import subcategoryRouter from "../subcategory/subcategory.routes.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter=Router()

categoryRouter.use("/:category/subcategories",subcategoryRouter)
categoryRouter.route('/')
.post(protectedRoutes,uploadSinleFile('image','categories'),Validate(addCategoryValidation),addCategory)
.get(allCategories)
categoryRouter.route('/:id')
.get(getCategory)
.put(uploadSinleFile('image','categories'),updateCategory)
.delete(deleteCategory)
export default categoryRouter