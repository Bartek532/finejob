import {
  fetchRecomendedOffers,
  fetchOffers,
  fetchSingleOffer,
} from "../services/offers";
import { addRandomSalaryToOffer } from "../utils";
import type { Request, Response } from "express";

export const getRecommendedOffers = async (req: Request, res: Response) => {
  res
    .status(200)
    .json((await fetchRecomendedOffers()).map(addRandomSalaryToOffer));
};

export const getOffers = async (req: Request, res: Response) => {
  const path = Object.entries(req.query)
    .map(item => {
      if (item[0] === "q") {
        item[0] = "search";
      }

      return item;
    })
    .map(item => item.join("="))
    .join("&");

  res.status(200).json((await fetchOffers(path)).map(addRandomSalaryToOffer));
};

export const getSingleOffer = async (req: Request, res: Response) => {
  res
    .status(200)
    .json(addRandomSalaryToOffer(await fetchSingleOffer(req.params.id)));
};
