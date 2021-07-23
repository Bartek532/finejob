import {
  fetchRecomendedOffers,
  fetchOffers,
  fetchSingleOffer,
  addOffer,
  removeOffer,
  changeOffer,
} from "../services/offers";
import { validateOffer } from "../validation";
import type { Request, Response } from "express";
import slug from "slug";

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

  res.status(200).json(
    await addOffer(req.user!.id, {
      ...req.body,
      company_name: req.user!.company,
      id: slug(`${req.user!.company} ${req.body.title} ${req.body.city}`),
    }),
  );
};

export const deleteOffer = async (req: Request, res: Response) => {
  const offer = await fetchSingleOffer(req.params.id);

  if (offer.userId === req.user!.id) {
    return res.status(200).json(await removeOffer(req.params.id));
  }

  res.status(400);
};

export const editOffer = async (req: Request, res: Response) => {
  const { error } = validateOffer(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const offer = await fetchSingleOffer(req.params.id);

  if (offer.userId === req.user!.id) {
    return res
      .status(200)
      .json(
        await changeOffer(req.params.id, {
          ...req.body,
          id: slug(`${req.user!.company} ${req.body.title} ${req.body.city}`),
        }),
      );
  }

  res.status(400);
};
