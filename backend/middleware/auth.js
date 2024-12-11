import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { Token } from "../models/Token.js";

export const authorize = (roles = []) => {
  return catchAsyncError(async (req, res, next) => {
    const { authToken } = req.cookies;
    if (!authToken) {
      return next(new ErrorHandler("Not logged in!", 401));
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded._id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    const tokenInDatabase = await Token.findOne({
      user: decoded._id,
      token: authToken,
    });
    if (!tokenInDatabase) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }

    req.user = user;

    if (roles.length && !roles.includes(req.user.role)) {
      return next(new ErrorHandler("Unauthorized !", 403));
    }
    next();
  });
};
