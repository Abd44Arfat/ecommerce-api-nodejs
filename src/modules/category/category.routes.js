
import { Router } from "express";
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { uploadSinleFile } from "../../fileUpload/fileUpload.js";

const categoryRouter=Router()
categoryRouter.route('/')
.post(uploadSinleFile('image','categories'),addCategory)
.get(allCategories)
categoryRouter.route('/:id')
.get(getCategory)
.put(uploadSinleFile('image','categories'),updateCategory)
.delete(deleteCategory)
export default categoryRouter