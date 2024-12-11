import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Verification Token is a mandatory field!"],
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is mandatory!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 120,
    },
  },
  { timestamps: true }
);

verificationTokenSchema.index({ token: 1, createdAt: 1 });

export const VerificationToken = mongoose.model(
  "verificationToken",
  verificationTokenSchema
);
