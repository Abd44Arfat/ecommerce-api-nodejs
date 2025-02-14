
import { Router } from "express";
import { allUser ,addUser, getUser, deleteUser, updateUser} from "./user.controller.js";


const userRouter=Router()
userRouter.route('/')
.post(addUser)
.get(allUser)

userRouter.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)
export default userRouter