import mongoose, { Types } from "mongoose";
import { User } from "./user.model.js";
import { Product } from "./product.model.js";
const schema = new mongoose.Schema({
    comment: String,

    user: {
        type: Types.ObjectId,
        ref: 'User',
        required:true
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required:true
    },





}, { timesstamps: true, versionKey: false });
export const Review = mongoose.model('Review', schema);

