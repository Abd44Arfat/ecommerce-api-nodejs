
import { addCategory } from "./category.controller.js"
import categoryRouter from "./category.routes.js"
export const bootstrap=(app)=>{



app.use('/api/categories',categoryRouter)

}