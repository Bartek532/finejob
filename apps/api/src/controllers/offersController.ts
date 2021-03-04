import {
  fetchRecomendedOffers,
  fetchOffers,
  fetchSingleOffer,
  addOffer,
} from "../services/offers";
import { validateOffer } from "../validation";
import type { Request, Response } from "express";

export const getRecommendedOffers = async (req: Request, res: Response) => {
  res.status(200).json(await fetchRecomendedOffers());
};

export const getOffers = async (req: Request, res: Response) => {
  res.status(200).json(await fetchOffers(req.query as any));
};

export const getSingleOffer = async (req: Request, res: Response) => {
  res.status(200).json(await fetchSingleOffer(req.params.id));
};

export const createOffer = async (req: Request, res: Response) => {
  const { error } = validateOffer(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  res
    .status(200)
    .json(addOffer(req.user!.id, { ...req.body, company: req.user!.company }));
};
