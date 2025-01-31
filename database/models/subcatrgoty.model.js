import mongoose, { Types } from "mongoose"; // Import Types from mongoose

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
    Category: {
        type: Types.ObjectId, // Use Types.ObjectId for reference
        ref: "Category"
    },
    createdBy: {
        type: Types.ObjectId, // Use Types.ObjectId for reference
        ref: "User", // Ensure ref is a string for the model name
    },
}, { timestamps: true, versionKey: false }); // Fixed typo: 'timesstamps' to 'timestamps'

export const SubCategory = mongoose.model('SubCategory', schema);