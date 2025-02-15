
import { Router } from "express";
import { allowedTo,protectedRoutes } from "../auth/auth.controller.js";
import { addAddress, getLoggedUserAddress, removeAddress } from "./address.controller.js";

const AddressRouter=Router()
AddressRouter.route('/')
.patch(protectedRoutes,allowedTo('user'),addAddress)
.get(protectedRoutes,allowedTo('user',),getLoggedUserAddress)
 AddressRouter.route('/:id')
.delete(protectedRoutes,allowedTo('user'),removeAddress)



export default AddressRouter