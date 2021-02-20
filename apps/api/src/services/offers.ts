import fetch from "node-fetch";
import type { Offer } from "../types";

export const fetchRecomendedOffers = async (): Promise<Offer[]> => {
  const response = await fetch(`${process.env.JOBS_API_URL}.json`);

  return await response.json();
};

export const fetchOffersByLocation = async (
  location: string,
  page: string | number
): Promise<Offer[]> => {
  const response = await fetch(
    `${process.env.JOBS_API_URL}.json?location=${location}&page=${page}`
  );

  return await response.json();
};

export const fetchOffersByQuery = async (
  query: string,
  page: string | number
): Promise<Offer[]> => {
  const response = await fetch(
    `${process.env.JOBS_API_URL}.json?search=${query}&page=${page}`
  );

  return await response.json();
};

export const fetchSingleOffer = async (id: string): Promise<Offer> => {
  const response = await fetch(`${process.env.JOBS_API_URL}/${id}.json`);

  return await response.json();
};
