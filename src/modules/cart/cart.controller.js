import { Cart } from "../../../database/models/cart.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

function calcTotalPrice(isCartExist){

    isCartExist.totalCartPrice = isCartExist.cartItems.reduce((prev, item) => 
        prev += item.quantity * item.price, 0)

}

const addToCart = catchError(async (req, res, next) => {
    let product = await Product.findById(req.body.product);
    if (!product) return next(new AppError("product not found", 404))
    req.body.price = product.price
    if (req.body.quantity > product.stock) return next(new AppError("out of stock ! sold out !", 400))
    let isCartExist = await Cart.findOne({ user: req.user._id })
    if (!isCartExist) {
        let cart = new Cart({
            user: req.user._id,
            cartItems: [req.body],
        });
        calcTotalPrice(cart)
        await cart.save();
        res.json({ message: "success", cart });
    } else {
        let item = isCartExist.cartItems.find(item =>
            item.product == req.body.product
        )
        if (item) {
            item.quantity += req.body.quantity || 1;
            if (item.quantity > product.stock) return next(new AppError("out of stock ! sold out !", 400))
        }
        if (!item) isCartExist.cartItems.push(req.body)

            calcTotalPrice(isCartExist)
        await isCartExist.save();
        res.json({ message: "success", cart: isCartExist });
    }

})
export {

    addToCart
};
