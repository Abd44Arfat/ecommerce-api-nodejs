import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { Product } from "../../../database/models/product.model.js"
import { deleteOne } from "../handlers/handelrs.js";
import { ApiFeature } from "../../utils/apiFeature.js";

const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    req.body.imgCover = req.files.imgCover[0].filename;
    req.body.images = req.files.images.map(img => img.filename);

    let product = new Product(req.body);
    await product.save();
    res.json({ message: "success", product });
});



const allProducts = catchError(async (req, res, next) => {
let apiFeatures=new ApiFeature(Product.find(),req.query).pagination().fields().filter().sort().search()

    let products = await apiFeatures.mongooseQuery
    res.json({ message: "success",page:apiFeatures.pageNumber, products });
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