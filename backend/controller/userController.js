import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import bcrypt from "bcrypt";
import { signJWTToken } from "../utils/sendJWTToken.js";
import { User } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { VerificationToken } from "../models/VerificationToken.js";
import crypto from "crypto";
import { Token } from "../models/Token.js";

export const createAdmin = catchAsyncError(async (req, res, next) => {
  const { name, email, password, securityKey } = req.body;
  if (!name) return next(new ErrorHandler("Please provide name", 400));
  if (!email) return next(new ErrorHandler("Please provide email", 400));
  if (!password) return next(new ErrorHandler("Please provide password", 400));
  if (!securityKey)
    return next(new ErrorHandler("Please provide security key", 400));

  if (securityKey !== process.env.SECURITY_KEY)
    return next(new ErrorHandler("Invalid Security key", 401));

  const flag = await User.findOne({ email });

  if (flag)
    return next(new ErrorHandler("User already present with this email!", 401));

  const user = await User.create({
    name,
    email,
    password,
    role: "admin",
    isVerified: true,
  });

  res.status(201).json({
    success: true,
    user,
  });
});

export const createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) return next(new ErrorHandler("Please provide name", 400));
  if (!email) return next(new ErrorHandler("Please provide email", 400));
  if (!password) return next(new ErrorHandler("Please provide password", 400));

  const flag = await User.findOne({ email });

  if (flag)
    return next(new ErrorHandler("User already present with this email!", 401));

  const generatedToken = crypto.randomBytes(20).toString("hex");
  const generatedToken2 = crypto
    .createHash("sha256")
    .update(generatedToken)
    .digest("hex");

  try {
    const user = await User.create({ name, email, password });

    await VerificationToken.create({
      user: user._id,
      token: generatedToken2,
    });

    const url = `${process.env.FRONTEND_URL}/verify/${generatedToken2}`;
    const message = `Click on the link to verify the account: ${url}. If you have not requested this, please ignore.`;

    await sendEmail(user.email, "Account Verification", message);

    res.status(201).json({
      success: true,
      message: "User Created Successfully!",
      user,
    });
  } catch (error) {
    await User.deleteOne({ email });
    return next(new ErrorHandler("Error in creating user and token", 500));
  }
});

export const verify = catchAsyncError(async (req, res, next) => {
  const token = req.body.token;

  if (!token) return next(new ErrorHandler("Page Not Found!", 401));

  const verificationToken = await VerificationToken.findOne({ token });

  if (!verificationToken)
    return next(
      new ErrorHandler("Invalid token or User already verified.", 401)
    );

  const user = await User.findOneAndUpdate(
    { _id: verificationToken.user },
    { isVerified: true }
  );

  if (!user)
    return next(
      new ErrorHandler("Invalid token or User already verified.", 400)
    );

  await VerificationToken.deleteOne({ token });

  res.status(200).json({
    success: true,
    message: "User Verified Successfully",
    user,
  });
});

export const userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return next(new ErrorHandler("Please provide email", 400));
  if (!password) return next(new ErrorHandler("Please provide password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 401));
  if (user.isVerified === false)
    return next(new ErrorHandler("Account Not Verified!", 401));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invalid email or password", 401));

  const jwtToken = signJWTToken(user._id);

  await Token.create({
    user: user?._id,
    token: jwtToken,
  });

  res
    .status(200)
    .cookie("authToken", jwtToken, {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: true,
      httpOnly: true,
    })
    .json({
      success: true,
      message: `Welcome back ${user.email}`,
      user,
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req?.user,
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("authToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});
