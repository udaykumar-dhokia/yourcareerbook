import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatus.js";
import jwt from "../utils/jwt.js";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const decoded = await jwt.verify(token);

    if (!decoded) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Invalid token" });
    }

    (req as any).userId = decoded.id;

    next();
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
