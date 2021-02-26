import axios from "axios";
import type { Offer } from "../../../types";

export const fetchRecomendedOffers = async () => {
  const { data }: { data: Offer[] } = await axios.get(
    `${process.env.JOBS_API_URL}.json`,
  );

  return data;
};

export const fetchOffers = async (path: string) => {
  const { data }: { data: Offer[] } = await axios.get(
    `${process.env.JOBS_API_URL}.json?${path}`,
  );

  return data;
};

export const fetchSingleOffer = async (id: string) => {
  const { data }: { data: Offer } = await axios.get(
    `${process.env.JOBS_API_URL}/${id}.json`,
  );

  return data;
};
