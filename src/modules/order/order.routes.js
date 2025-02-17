
import { Router } from "express";
import { createCashOrder, createCeckoutSessoion, getAllOrders, getUserOrders } from "./order.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const OrderRouter=Router()
OrderRouter.route('/')
.get(protectedRoutes,allowedTo('admin'),getAllOrders)
OrderRouter.get('/user',protectedRoutes,allowedTo('user'),getUserOrders)


 OrderRouter.route('/:id')
.post(protectedRoutes,allowedTo('user'),createCashOrder)

OrderRouter.post('/checkout/:id',protectedRoutes,allowedTo('user'),createCeckoutSessoion)
export default OrderRouter