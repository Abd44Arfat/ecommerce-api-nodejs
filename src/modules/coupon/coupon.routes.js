
import { Router } from "express";
import { addCoupon, allCoupon, deleteCoupon, getCoupon, updateCoupon } from "./coupon.controller.js";
import { protectedRoutes ,allowedTo} from "../auth/auth.controller.js";

const CouponRouter=Router()
CouponRouter.use(protectedRoutes,allowedTo('admin'))
CouponRouter.route('/')
.post(protectedRoutes,addCoupon)
.get(allCoupon)

CouponRouter.route('/:id')
.get(getCoupon)
.put(updateCoupon)
.delete(deleteCoupon)
export default CouponRouter