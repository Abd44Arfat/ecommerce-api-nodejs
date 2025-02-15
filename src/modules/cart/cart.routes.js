
import { Router } from "express";
import { allowedTo,protectedRoutes } from "../auth/auth.controller.js";
import {  addToCart  } from "./cart.controller.js";

const CartRouter=Router()
CartRouter.route('/')
.post(protectedRoutes,allowedTo('user'),addToCart)
// .get(protectedRoutes,allowedTo('user',),getLoggedUserAddress)
//  CartRouter.route('/:id')
// .delete(protectedRoutes,allowedTo('user'),removeAddress)



export default CartRouter