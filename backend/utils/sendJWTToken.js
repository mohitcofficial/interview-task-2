import jwt from "jsonwebtoken";

export const signJWTToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });
};
