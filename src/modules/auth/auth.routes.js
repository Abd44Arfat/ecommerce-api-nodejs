import express from "express";
import { checkEmail } from "../../middleware/checkemail.js";
import { changeUserPassword, signIn, signUp } from "./auth.controller.js";


const authRouter = express.Router();

authRouter.post("/signup",checkEmail, signUp);
authRouter.post("/signin", signIn);
authRouter.patch("/change-password", changeUserPassword);

export default authRouter;