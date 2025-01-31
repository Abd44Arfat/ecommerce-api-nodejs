import mongoose, { Types } from "mongoose";
import { User } from "./user.model";
import { Product } from "./product.model";
const schema = new mongoose.Schema({
    code: {type: String,
        unique : true,
        required: true},

        expires:Date,
        discount: Number,





}, { timesstamps: true, versionKey: false });
export const Coupon = mongoose.model('Coupon', schema);

