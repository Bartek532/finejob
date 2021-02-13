import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    return res.status(401).json({ message: "Access denied. Log in!" });
  }

  const token = cookie.split("=")[1];

  try {
    jwt.verify(token, process.env.SECRET_TOKEN as string);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }

  if (req.route.path !== "/islogin") {
    next();
  } else {
    res.status(200).json({ message: "Valid token." });
  }
};