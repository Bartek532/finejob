import { Request, Response } from "express";
import { validateLogin, validateRegister } from "../validation";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../services/users";

export const login = async (req: Request, res: Response) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await findUserByEmail(req.body.email);

  if (!user) {
    return res
      .status(400)
      .json({ message: "You don't have an account. Register!" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password." });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN as string);

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    })
    .json({ message: "Logged in!" });
};

export const register = async (req: Request, res: Response) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const isUserExists = await findUserByEmail(req.body.email);
  if (isUserExists) {
    return res
      .status(409)
      .json({ message: "You already have an account. Login!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //const token = crypto.randomBytes(16).toString("hex");

  const user = await createUser(req.body.name, req.body.email, hashedPassword);

  return res.status(200).json(user);
};
