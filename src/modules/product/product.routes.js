
import { Router } from "express";
import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from "./product.controller.js";
import { uploadMixOFFiles } from "../../fileUpload/fileUpload.js";
const productRouter=Router()
productRouter.route('/')
.post(uploadMixOFFiles([{name:'images',maxCount:8},{name:'imgCover',maxCount:1}],'products'),addProduct)
.get(allProducts)

productRouter.route('/:id')
.get(getProduct)
.put(uploadMixOFFiles(([{name:'images',maxCount:8},{name:'imgCover',maxCount:1}],'products')),updateProduct)
.delete(deleteProduct)
export default productRouter