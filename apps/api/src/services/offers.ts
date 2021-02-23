import fetch from "node-fetch";
import type { Offer } from "../types";

export const fetchRecomendedOffers = async (): Promise<Offer[]> => {
  const response = await fetch(`${process.env.JOBS_API_URL}.json`);

  return await response.json();
};

export const fetchOffers = async (path: string): Promise<Offer[]> => {
  const response = await fetch(`${process.env.JOBS_API_URL}.json?${path}`);

  return await response.json();
};

export const fetchSingleOffer = async (id: string): Promise<Offer> => {
  const response = await fetch(`${process.env.JOBS_API_URL}/${id}.json`);

  return await response.json();
};
