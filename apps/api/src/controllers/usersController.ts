import { Request, Response } from "express";
import { validateLogin, validateRegister } from "../validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  findOfferInLibrary,
  changeUserData,
  addOfferToUserLibrary,
  deleteOfferFromLibrary,
  fetchUserLibrary,
} from "../services/users";
import { addRandomSalaryToOffer } from "../utils";

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
      sameSite: "lax",
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

  const user = await createUser(
    req.body.name,
    req.body.email,
    req.body.company,
    hashedPassword
  );

  return res.status(200).json(user);
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout!" });
};

export const getUserInfo = async (req: Request, res: Response) => {
  res.status(200).json({ ...req.user, password: "" });
};

export const changeUserInfo = async (req: Request, res: Response) => {
  const user = await findUserByEmail(req.body.email);
  if (user && req.user!.id !== user.id) {
    return res
      .status(400)
      .json({ message: "You cannot change an email to other existing email." });
  }
  res.status(200).json(await changeUserData(req.user!.id, req.body));
};

export const saveOffer = async (req: Request, res: Response) => {
  const isOfferInLibrary = await findOfferInLibrary(req.user!.id, req.body.id);

  if (isOfferInLibrary) {
    return res
      .status(400)
      .json({ message: "You have already save this offer." });
  }

  await addOfferToUserLibrary(req.user!.id, req.body.id);

  res.status(200).json({ message: "Offer has been saved!" });
};

export const unsaveOffer = async (req: Request, res: Response) => {
  const isOfferInLibrary = await findOfferInLibrary(
    req.user!.id,
    req.params.id
  );

  if (!isOfferInLibrary) {
    return res
      .status(400)
      .json({ message: "You can't unsave an offer which is not in library." });
  }

  await deleteOfferFromLibrary(req.user!.id, req.params.id);

  res.status(200).json({ message: "Offer has been removed from the library!" });
};

export const getSavedOffer = async (req: Request, res: Response) => {
  const offer = await findOfferInLibrary(req.user!.id, req.params.id);

  if (offer) {
    return res.status(200).json(offer);
  }

  res.status(400).json({ message: "This offer is not saved." });
};

export const getAllSavedOffers = async (req: Request, res: Response) => {
  res
    .status(200)
    .json((await fetchUserLibrary(req.user!.id)).map(addRandomSalaryToOffer));
};
