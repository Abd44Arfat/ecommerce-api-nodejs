import mongoose, { Types } from "mongoose";
import { User } from "./user.model.js";
const schema = new mongoose.Schema({

user:{type:Types.ObjectId,ref:"User"},
orderItems:[{product:{type:Types.ObjectId,ref:"Product"},
quantity:Number,
price:Number

}],
totalOrderPrice:Number,
shippingAddress: {
city:String,
street:String,
phone:String,
},
paymentType:{
    type: String,
    enum:['cash','card'],
    default: 'cash'
},
isPaid: {
type: Boolean,
default: false
},
paidAt:Date,
isDelivered: {
    type:Boolean,
    default: false
},
deliveredAt:Date


}, { timesstamps: true, versionKey: false });




export const Order = mongoose.model('Order', schema);

