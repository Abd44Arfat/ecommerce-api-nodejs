
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
    process.env.JWT_key
  );
  res.status(201).json({ message: "success", user, token });
});

const signIn = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {

    let token = jwt.sign(
      { email: user.email, name: user.name, id: user._id, role: user.role },
      process.env.JWT_key
    );
    return res.status(201).json({ message: "success", user, token });
  }



  next(new AppError("Invalid email or password", 401));
});
const changeUserPassword = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {

    await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword,passwordChangedAt:Date.now()  });
    let token = jwt.sign(
      { email: user.email, name: user.name, id: user._id, role: user.role },
      process.env.JWT_key
    );
    return res.status(201).json({ message: "success", token });
  }
  next(new AppError("Invalid email or password", 401));
});


const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let userPayload = null;

  if (!token) return next(new AppError("Token not found", 401));

  try {
    userPayload = jwt.verify(token,   process.env.JWT_key);
  } catch (err) {
    return next(new AppError(err.message, 401));
  }

  let user = await User.findById(userPayload.id); // Use 'id' instead of 'userId'

  if (!user) return next(new AppError("User not found", 401));


  console.log('Token created at:', userPayload.iat);
  console.log('Password changed at:', user.passwordChangedAt);
if(user.passwordChangedAt){
  let time = parseInt(user.passwordChangedAt.getTime() / 1000);
  if (time > userPayload.iat) return next(new AppError('Invalid token... login again', 401));
}
  req.user = user;
  next();
});

const allowedTo = (...roles)=>{

 return catchError(async (req, res, next) => {

if(roles.includes(req.user.role))

return  next()
  return next(new AppError('you are not authorized to access this endpoint',401))


  })

}


export { signUp, signIn, changeUserPassword,protectedRoutes,allowedTo };