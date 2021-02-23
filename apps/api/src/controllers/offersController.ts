import {
  fetchRecomendedOffers,
  fetchOffersByLocation,
  fetchOffersByQuery,
  fetchSingleOffer,
} from "../services/offers";
import { addRandomSalaryToOffer } from "../utils";
import { findOfferInLibrary } from "../services/users";
import type { Request, Response } from "express";

export const getRecommendedOffers = async (req: Request, res: Response) => {
  res
    .status(200)
    .json((await fetchRecomendedOffers()).map(addRandomSalaryToOffer));
};

export const getOffersByQuery = async (req: Request, res: Response) => {
  const page = (req.query.page as string) || 1;

  if (!req.query.q) {
    return res.status(400).json({ message: "Invalid query" });
  }

  res
    .status(200)
    .json(
      (await fetchOffersByQuery(req.query.q as string, page)).map(
        addRandomSalaryToOffer
      )
    );
};

export const getOffersByLocation = async (req: Request, res: Response) => {
  const page = (req.query.page as string) || 1;

  if (!req.query.q) {
    return res.status(400).json({ message: "Invalid location." });
  }

  res
    .status(200)
    .json(
      (await fetchOffersByLocation(req.query.q as string, page)).map(
        addRandomSalaryToOffer
      )
    );
};

export const getSingleOffer = async (req: Request, res: Response) => {
  res
    .status(200)
    .json(addRandomSalaryToOffer(await fetchSingleOffer(req.params.id)));
};

export const checkIsOfferSaved = async (req: Request, res: Response) => {
  const isOfferInLibrary = await findOfferInLibrary(
    req.user!.id,
    req.params.id
  );

  if (isOfferInLibrary.length) {
    return res.status(200).json({ message: "This offer is saved" });
  }

  res.status(400).json({ message: "This offer is not saved." });
};
