import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handelrs.js";
import { Review } from "../../../database/models/review.model.js";
const addReview = catchError(async (req, res, next) => {
let isExist=await Review.findOne({user:req.user._id,product:req.body.product})
if(isExist) return next(new AppError("you can't add more than one review",409))
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
    review || next(new AppError("review not found", 404));
    !review || res.json({ message: "success", review });
});

const updateReview = catchError(async (req, res, next) => {

    let review = await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id}, req.body, { new: true });
    review || next(new AppError("review not found or not belong to you", 404));
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