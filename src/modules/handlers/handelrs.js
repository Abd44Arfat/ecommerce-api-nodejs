
import { catchError } from "../../middleware/catchError.js"
export const deleteOne=(model)=>{
return catchError(async(req,res,next)=>{


 let document =await document.findByIdAndDelete(req.params.id)
  document ||   next(new AppError("document not found",404))
   !document || res.json({message:"success",document})



}
)



}