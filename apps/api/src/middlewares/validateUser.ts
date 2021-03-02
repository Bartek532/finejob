import { Request, Response, NextFunction } from "express";
import { findUserById } from "../services/users";
import jwt from "jsonwebtoken";

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = jwt.decode(req.token!) as { id: number; iat: number };

  const user = await findUserById(id);

  if (!user) {
    return res.status(401).json({ message: "Account doesn't exist." });
  }

  req.user = user;
  next();
};
