import BankModel from "../models/bankModel.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("not authorized, login");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRETS);

    const user = await BankModel.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("not authorized, login");
  }
};

export default protect;
