import fetch from "node-fetch";
import type { Offer } from "../types";

export const fetchRecomendedOffers = async (): Promise<Offer[]> => {
  const response = await fetch(process.env.JOBS_API_URL!);

  return await response.json();
};

export const fetchOffersByLocation = async (
  location: string,
  page: string | number
): Promise<Offer[]> => {
  const response = await fetch(
    `${process.env.JOBS_API_URL}?location=${location}&page=${page}`
  );

  return await response.json();
};

export const fetchOffersByQuery = async (
  query: string,
  page: string | number
): Promise<Offer[]> => {
  const response = await fetch(
    `${process.env.JOBS_API_URL}?search=${query}&page=${page}`
  );

  return await response.json();
};
