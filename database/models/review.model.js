import mongoose, { Types } from "mongoose";
import { User } from "./user.model";
import { Product } from "./product.model";
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
    Product: {
        type: Types.ObjectId,
        ref: 'Product',
        required:true
    },





}, { timesstamps: true, versionKey: false });
export const Review = mongoose.model('Review', schema);

