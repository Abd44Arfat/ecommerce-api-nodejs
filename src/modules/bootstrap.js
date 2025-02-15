
import subcategoryRouter from "./subcategory/subcategory.routes.js"
import categoryRouter from "./category/category.routes.js"
import brandRouter from "./brand/brand.routes.js"
import productRouter from "./product/product.routes.js"
import userRouter from "./user/user.routes.js"
import authRouter from "./auth/auth.routes.js"
import reviewRouter from "./review/review.routes.js"
import wishlistRouter from "./wishlist/wishlist.routes.js"
import AddressRouter from "./address/address.routes.js"
import CouponRouter from "./coupon/coupon.routes.js"
export const bootstrap=(app)=>{



app.use('/api/categories',categoryRouter)
app.use('/api/subcategories',subcategoryRouter)
app.use('/api/brand',brandRouter)
app.use('/api/product',productRouter)
app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/reviews',reviewRouter)
app.use('/api/wishlists',wishlistRouter)
app.use('/api/addresses',AddressRouter)
app.use('/api/coupons',CouponRouter)






}