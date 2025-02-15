import { AppError } from "../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handelrs.js";
import { Coupon } from "../../../database/models/coupon.model.js";


const addCoupon = catchError(async (req, res, next) => {
let isExist=await Coupon.findOne({code:req.body.code})
if(isExist) return next(new AppError("coupon already exist",400))
    let coupon = new Coupon(req.body);
    await coupon.save();
    res.json({ message: "success", coupon });
});



const allCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.find();
    res.json({ message: "success", coupon });
});

const getCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findById(req.params.id);
    coupon || next(new AppError("coupon not found", 404));
    !coupon || res.json({ message: "success", coupon });
});

const updateCoupon = catchError(async (req, res, next) => {
   
    let coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    coupon || next(new AppError("coupon not found", 404));
    !coupon || res.json({ message: "success", coupon });
});

const deleteCoupon = deleteOne(Coupon)


export {
    addCoupon,
    allCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon,
 
};