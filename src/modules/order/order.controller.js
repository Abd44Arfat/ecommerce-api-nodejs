import { Cart } from "../../../database/models/cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import Stripe from 'stripe';
const stripe = new Stripe('');



const createCashOrder = catchError(async (req, res, next) => {

    let cart = await Cart.findById( req.params.id)
if(!cart) return next(new AppError("cart not found",404))
    let totalOrderPrice=cart.totalCartPriceAfterDiscount||cart.totalCartPrice
let order =new Order({
user:req.user._id,
orderItems:cart.cartItems,
shippingAddress:req.body.shippingAddress,
totalOrderPrice
})
await order.save()

let options=cart.cartItems.map(item=>{
    return ({
        updateOne:{
        "filter":{ _id: item.product },
        "update":{$inc:{sold:item.quantity,stock:-item.quantity}}
        }
        }
    )
})
await Product.bulkWrite(options)
await Cart.findOneAndDelete(cart._id)

res.json({ message: "success", order });
});


const getUserOrders = catchError(async (req, res, next) => {
let orders =await Order.findOne({user:req.user._id}).populate("orderItems.product")
res.json({ message: "success", orders });
});


const getAllOrders = catchError(async (req, res, next) => {
    let orders =await Order.find({})
    
res.json({ message: "success", orders });
    
    
    });
    


    const createCeckoutSessoion = catchError(async (req, res, next) => {
        let cart = await Cart.findById(req.params.id);
        if (!cart) return next(new AppError("cart not found", 404));
    
        let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
    
        // Create the checkout session with the correct structure
        let session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "egp",
                        product_data: {
                            name: req.user.name,
                        },
                        unit_amount: totalOrderPrice * 100, // Amount in cents
                    },
                    quantity: 1, // Move quantity here
                },
            ],
            mode: "payment",
            success_url: 'https://www.linkedin.com/feed/update/urn:li:activity:7296966934149947392/',
            cancel_url: 'https://www.linkedin.com/feed/update/urn:li:activity:7296966934149947392/',
            customer_email: req.user.email,
            client_reference_id: req.params.id,
            metadata: req.body.shippingAddress,
        });
    
        res.json({ message: "success", session });
    });
        



export {
    createCashOrder,
    getUserOrders,
    getAllOrders,
    createCeckoutSessoion
};

