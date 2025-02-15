import { Cart } from "../../../database/models/cart.model.js";
import { catchError } from "../../middleware/catchError.js";


const addToCart = catchError(async (req, res, next) => {
let isCartExist=await Cart.findOne({user:req.user._id})
if(!isCartExist) {
let cart = new Cart({
    user:req.user._id,
    cartItems:[req.body],
});
await cart.save();
res.json({ message: "success", cart });

}else{
res.json({ message: "else" });
}

})
export {

    addToCart
};
