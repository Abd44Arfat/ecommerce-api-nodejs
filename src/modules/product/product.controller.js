import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import {Product}from "../../../database/models/product.model.js"
import { deleteOne } from "../handlers/handelrs.js";

const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    req.body.imgCover = req.files.imgCover[0].filename;
    req.body.images = req.files.images.map(img => img.filename);

    let product = new Product(req.body);
    await product.save();
    res.json({ message: "success", product });
});



const allProducts = catchError(async (req, res, next) => {
let pageNumber=req.query.page * 1 || 1
if(req.query.pageNumber<1) pageNumber=1
let limit=2
let skip=(pageNumber-1)*limit
let filterObj=structuredClone(req.query)
filterObj=JSON.stringify(filterObj)
filterObj=filterObj.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
filterObj=JSON.parse(filterObj)

let excludedFields=['page','sort','search','fields']
excludedFields.forEach(el=>delete filterObj[el])



console.log(filterObj)
 let mongooseQuery =  Product.find(filterObj).skip(skip).limit(limit);

if(req.query.sort){
let sortedBy=req.query.sort.split(',').join(' ')
mongooseQuery=mongooseQuery.sort(sortedBy)


}

    let products= await mongooseQuery
    res.json({ message: "success",pageNumber, products });
});

const getProduct = catchError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    product || next(new AppError("Product not found", 404));
    !product || res.json({ message: "success", product });
});

const updateProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    req.body.imgCover = req.files.imgCover[0].filename;
    req.body.images = req.files.images.map(img => img.filename);
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    product || next(new AppError("category not found", 404));
    !product || res.json({ message: "success", product });
});

const deleteProduct = deleteOne(Product)


export {
    addProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct,
 
};