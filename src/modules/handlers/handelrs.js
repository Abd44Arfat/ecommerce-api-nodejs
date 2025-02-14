
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
export const deleteOne = (model) => {
   return catchError(async (req, res, next) => {
       let document = await model.findByIdAndDelete(req.params.id); // Use model here
       document || next(new AppError("Document not found", 404));
       !document || res.json({ message: "success", document });
   });
};