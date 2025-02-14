
import { Router } from "express";
import { allUser ,addUser, getUser, deleteUser, updateUser} from "./user.controller.js";
import { checkEmail } from "../../middleware/checkemail.js";


const userRouter=Router()
userRouter.route('/')
.post(checkEmail,addUser)
.get(allUser)

userRouter.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)
export default userRouter