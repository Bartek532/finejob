import { fetchAllOffers, fetchOffersByLocation } from "../services/offers";
import type { Request, Response } from "express";

export const getAllOffers = async (req: Request, res: Response) => {
  const perPage = (req.query.per_page as string) || 20;
  const page = (req.query.page as string) || 1;

  if (!req.query.q) {
    return res.status(400).json({ message: "Invalid query" });
  }

  res
    .status(200)
    .json(await fetchAllOffers(req.query.q as string, perPage, page));
};

export const getOffersByLocation = async (req: Request, res: Response) => {
  const perPage = (req.query.per_page as string) || 20;
  const page = (req.query.page as string) || 1;

  if (!req.query.location) {
    return res.status(400).json({ message: "Invalid location" });
  }

  res
    .status(200)
    .json(await fetchOffersByLocation(req.query.q as string, perPage, page));
};
