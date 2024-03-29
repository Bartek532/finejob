import { Request, Response } from "express";
import {
  validateLogin,
  validateRegister,
  validateChangeUserInfo,
} from "../validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  changeUserData,
  addOfferToUserLibrary,
  deleteOfferFromLibrary,
  fetchSavedOffer,
  fetchCreatedOffer,
  fetchUserLibrary,
  fetchOffersCreatedByUser,
} from "../services/users";

export const login = async (req: Request, res: Response) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await findUserByEmail(req.body.email);

  if (!user) {
    return res.status(401).json({ message: "Incorrect login or password." });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Incorrect login or password." });
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

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await createUser({ ...req.body, password: hashedPassword });

  res.status(201).json(user);
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(204).json({ message: "Succesfully logged out!" });
};

export const getUserInfo = async (req: Request, res: Response) => {
  const data = Object.fromEntries(
    Object.entries(req.user!).filter((item) => item[0] !== "password"),
  );
  res.status(200).json(data);
};

export const changeUserInfo = async (req: Request, res: Response) => {
  const { error } = validateChangeUserInfo(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await findUserByEmail(req.body.email);
  if (user && req.user!.id !== user.id) {
    return res.status(400).json({ message: "Incorrect data." });
  }

  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    req.user!.password,
  );
  if (!validPassword) {
    return res.status(401).json({ message: "Incorrect actual password." });
  }

  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

  res.status(200).json(
    await changeUserData(req.user!.id, {
      ...req.body,
      password: hashedPassword,
    }),
  );
};

export const saveOffer = async (req: Request, res: Response) => {
  const isOfferInLibrary = await fetchSavedOffer(
    req.user!.id,
    req.body.id.toString(),
  );

  if (isOfferInLibrary) {
    return res
      .status(409)
      .json({ message: "You have already save this offer." });
  }

  await addOfferToUserLibrary(req.user!.id, req.body.id.toString());

  res.status(201).json({ message: "Offer has been saved!" });
};

export const unsaveOffer = async (req: Request, res: Response) => {
  const isOfferInLibrary = await fetchSavedOffer(req.user!.id, req.params.id);

  if (!isOfferInLibrary) {
    return res.status(404);
  }

  await deleteOfferFromLibrary(req.user!.id, req.params.id);

  res.status(200).json({ message: "Offer has been removed from the library!" });
};

export const getUserOffer = async (req: Request, res: Response) => {
  if (req.query.type === "saved") {
    return res
      .status(200)
      .json(await fetchSavedOffer(req.user!.id, req.params.id));
  }

  if (req.query.type === "created") {
    return res
      .status(200)
      .json(await fetchCreatedOffer(req.user!.id, req.params.id));
  }

  res.status(400).json({ message: "Invalid parameters." });
};

export const getUserOffers = async (req: Request, res: Response) => {
  if (req.query.type === "saved") {
    return res.status(200).json(await fetchUserLibrary(req.user!.id));
  }

  if (req.query.type === "created") {
    return res.status(200).json(await fetchOffersCreatedByUser(req.user!.id));
  }

  res.status(400).json({ message: "Invalid parameters." });
};
