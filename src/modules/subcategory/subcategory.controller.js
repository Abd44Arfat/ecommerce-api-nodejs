import slugify from "slugify";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { SubCategory } from "../../../database/models/subcatrgoty.model.js";

const addSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    let subCategory = new SubCategory(req.body);
    await subCategory.save();
    res.json({ message: "success", subCategory });
});



const allSubCategories = catchError(async (req, res, next) => {
    let subcategories = await SubCategory.find();
    res.json({ message: "success", subcategories });
});

const getSubCategory = catchError(async (req, res, next) => {
    let subCategory = await SubCategory.findById(req.params.id);
    subCategory || next(new AppError("category not found", 404));
    !subCategory || res.json({ message: "success", subCategory });
});

const updateSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);
    let subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    subCategory || next(new AppError("category not found", 404));
    !subCategory || res.json({ message: "success", subCategory });
});

const deleteSubCategory = catchError(async (req, res, next) => {
    let subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    subCategory || next(new AppError("category not found", 404));
    !subCategory || res.json({ message: "success", subCategory });
});


export {
    addSubCategory,
    allSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
 
};