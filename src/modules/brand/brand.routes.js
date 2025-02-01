
import { Router } from "express";
import { addBrand, allBrand, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";
import { uploadSinleFile } from "../../fileUpload/fileUpload.js";

const brandRouter=Router()
brandRouter.route('/')
.post(uploadSinleFile('logo','brands'),addBrand)
.get(allBrand)

brandRouter.route('/:id')
.get(getBrand)
.put(uploadSinleFile('logo','brands'),updateBrand)
.delete(deleteBrand)
export default brandRouter