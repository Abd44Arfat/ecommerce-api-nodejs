import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handelrs.js";
import { Review } from "../../../database/models/review.model.js";
const addReview = catchError(async (req, res, next) => {
req.body.user = req.user._id // get user from token 
    let review = new Review(req.body);
    await review.save();
    res.json({ message: "success", review });
});



const allReview = catchError(async (req, res, next) => {
    let review = await Review.find();
    res.json({ message: "success", review });
});

const getReview = catchError(async (req, res, next) => {
    let review = await Review.findById(req.params.id);
    review || next(new AppError("category not found", 404));
    !review || res.json({ message: "success", review });
});

const updateReview = catchError(async (req, res, next) => {

    let review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    review || next(new AppError("category not found", 404));
    !review || res.json({ message: "success", review });
});

const deleteReview = deleteOne(Review)


export {
    addReview,
    allReview,
    getReview,
    updateReview,
    deleteReview,
 
};