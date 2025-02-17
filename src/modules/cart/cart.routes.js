
import { Router } from "express";
import { allowedTo,protectedRoutes } from "../auth/auth.controller.js";
import {  addToCart, applyCoupon, clearUsercart, getLoggedUserCart,  removeProductFromCart , updateQuantity  } from "./cart.controller.js";

const CartRouter=Router()
CartRouter.route('/')
.post(protectedRoutes,allowedTo('user'),addToCart)
.get(protectedRoutes,allowedTo('user'),getLoggedUserCart)
.delete(protectedRoutes,allowedTo('user'),clearUsercart)

 CartRouter.route('/:id')
.put(protectedRoutes,allowedTo('user'),updateQuantity)
.delete(protectedRoutes,allowedTo('user'),removeProductFromCart)

CartRouter.post('/apply-coupon',protectedRoutes,allowedTo('user'),applyCoupon)

export default CartRouter