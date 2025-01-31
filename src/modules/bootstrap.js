
import subcategoryRouter from "./subcategory/subcategory.routes.js"
import categoryRouter from "./subcategory/subcategory.routes.js"
import brandRouter from "./brand/brand.routes.js"
export const bootstrap=(app)=>{



app.use('/api/categories',categoryRouter)
app.use('/api/subcategories',subcategoryRouter)
app.use('/api/brand',brandRouter)




}