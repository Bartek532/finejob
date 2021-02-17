import {
  fetchRecomendedOffers,
  fetchOffersByLocation,
  fetchOffersByQuery,
} from "../services/offers";
import { addRandomSalaryToOffers } from "../utils";
import type { Request, Response } from "express";

export const getRecommendedOffers = async (req: Request, res: Response) => {
  res.status(200).json(addRandomSalaryToOffers(await fetchRecomendedOffers()));
};

export const getOffersByQuery = async (req: Request, res: Response) => {
  const page = (req.query.page as string) || 1;

  if (!req.query.q) {
    return res.status(400).json({ message: "Invalid query" });
  }

  res
    .status(200)
    .json(
      addRandomSalaryToOffers(
        await fetchOffersByQuery(req.query.q as string, page)
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
      addRandomSalaryToOffers(
        await fetchOffersByLocation(req.query.q as string, page)
      )
    );
};
