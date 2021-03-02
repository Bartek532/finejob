import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. Log in!" });
  }

  try {
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }

  req.token = token;

  if (req.route.path !== "/isLogin") {
    next();
  } else {
    res.status(200).json({ message: "Valid token." });
  }
};
