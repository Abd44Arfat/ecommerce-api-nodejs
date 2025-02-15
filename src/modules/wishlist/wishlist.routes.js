
import { Router } from "express";
import { addToWishList, getLoggedUseWishlist, removeFromWishList } from "./wishlist.controller.js";
import { allowedTo,protectedRoutes } from "../auth/auth.controller.js";

const wishlistRouter=Router()
wishlistRouter.route('/')
.patch(protectedRoutes,allowedTo('user'),addToWishList)
.get(protectedRoutes,allowedTo('user'),getLoggedUseWishlist)
wishlistRouter.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),removeFromWishList)

export default wishlistRouter