import {
  fetchRecomendedOffers,
  fetchOffersByLocation,
  fetchOffersByQuery,
  fetchSingleOffer,
} from "../services/offers";
import { addRandomSalaryToOffer } from "../utils";
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
