import mongoose, { Types } from "mongoose";
import { Category } from "./category.model.js";
import { Brand } from "./brand.model.js";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'category name must be unique'],
        trim: true,
        required: true,
        minlength: [2, 'too short category name'],
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,


    },
    description: {
        type: String,
        required: true,
        minLength: 30,
        maxLength: 500,
    },
    imgCover: String,
    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    priceAfterDiscount: {

        type: Number,
        required: true,
        min: 0,

    },
    sold: Number,
    stock: {
      type:  Number,
        min: 0,
    },
    Category: {

        type: Types.ObjectId,
        ref: 'Category',
    },

    subCategory: {

        type: Types.ObjectId,
        ref: 'SubCategory',
    },
    Brand: {

        type: Types.ObjectId,
        ref: 'Brand',
    },
    
    rateAvg: {
     type: Number,
     min: 0,
     max: 5,   
    },
    rqteCount: Number,

       
  createdBy: {
    type:  Types.ObjectId,
  
  ref:"User",
  },
    
}, { timesstamps: true, versionKey: false });


schema.post('init',function(doc){
    doc.imgCover="http://localhost:3000/uploads/products/" + doc.imgCover

    doc.images=doc.images.map(img=>"http://localhost:3000/uploads/products/" + img)
    
    })
export const Product = mongoose.model('Product', schema);

