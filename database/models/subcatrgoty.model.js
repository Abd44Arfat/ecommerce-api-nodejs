import mongoose from "mongoose";

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
   Category:{
type:Types.ObjectId,
ref:"Category"

   },
   createdBy: {
     type:  Types.ObjectId,
   
   ref:User,
   },
}, { timesstamps: true, versionKey: false });
export const SubCategory = mongoose.model('SubCategory', schema);

