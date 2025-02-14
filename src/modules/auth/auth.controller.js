
import jwt from "jsonwebtoken";
import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js"
import bcrypt from "bcrypt";
const signUp = catchError(async (req, res, next) => {

  let user = new User(req.body);
  await user.save();

  let token = jwt.sign(
    { email: user.email, name: user.name, id: user._id, role: user.role },
    "JR"
  );
  res.status(201).json({ message: "success", user, token });
});

const signIn = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {

    let token = jwt.sign(
      { email: user.email, name: user.name, id: user._id, role: user.role },
      "JR"
    );
    return res.status(201).json({ message: "success", token });
  }



  next(new AppError("Invalid email or password", 401));
});
const changeUserPassword = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {

    await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword,passwordChangedAt:Date.now()  });
    let token = jwt.sign(
      { email: user.email, name: user.name, id: user._id, role: user.role },
      "JR" 
    );
    return res.status(201).json({ message: "success", token });
  }
  next(new AppError("Invalid email or password", 401));
});


const protectedRooutes = catchError(async (req, res, next) => {
// check token exist or not 
//verify token 

//check user Id from token 
//token propper to change password

});

export { signUp, signIn, changeUserPassword };