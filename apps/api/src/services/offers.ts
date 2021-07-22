import { PrismaClient } from "@prisma/client";
import axios from "axios";
import type { Offer, Query } from "@finejob/types";
import { normalizeSalaryInOffer, builtQueryToFetchOffers } from "../utils";

const prisma = new PrismaClient();

export const fetchRecomendedOffers = async () => {
  const { data }: { data: Offer[] } = await axios.get(
    `${process.env.JOBS_API_URL}`,
  );

  return data.slice(0, 50).map((offer) => {
    return normalizeSalaryInOffer(offer);
  });
};

export const fetchOffers = async (query: Query) => {
  const page = Number(query.page) || 0;

  const offers = [
    ...(await prisma.offer.findMany({
      where: {
        OR: [
          {
            title: {
              contains: decodeURIComponent(query.q),
              mode: "insensitive",
            },
          },
          {
            company: {
              contains: decodeURIComponent(query.q),
              mode: "insensitive",
            },
          },
          {
            location: {
              contains:
                decodeURIComponent(query.location) ||
                decodeURIComponent(query.q),
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: decodeURIComponent(query.q),
              mode: "insensitive",
            },
          },
          /*
          {
            type: {
              contains: query.full_time
                ? query.full_time === "true"
                  ? "Full Time"
                  : "Part Time"
                : decodeURIComponent(query.q),
              mode: "insensitive",
            },
          },
          */
        ],
      },
      skip: page * 50,
      take: 50,
    })),
  ];

  const { data }: { data: Offer[] } = await axios.get(
    `${process.env.JOBS_API_URL}/search?${builtQueryToFetchOffers(query)}`,
  );

  return [
    ...offers,
    ...data
      .slice(page * 50, (page + 1) * 50)
      .map((offer) => normalizeSalaryInOffer(offer)),
  ];
};

export const fetchSingleOffer = async (offerId: string) => {
  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
  });

  if (offer) {
    return offer;
  }

  const { data }: { data: Offer } = await axios.get(
    `${process.env.JOBS_API_URL}/${offerId}`,
  );
  return normalizeSalaryInOffer(data);
};

/*
export const addOffer = (userId: number, data: Offer) => {
  return prisma.offer.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const removeOffer = async (offerId: string) => {
  await prisma.userOfferLibrary.deleteMany({ where: { offerId } });

  return await prisma.offer.delete({
    where: { id: offerId },
  });
};

export const changeOffer = (offerId: string, data: Offer) => {
  return prisma.offer.update({ where: { id: offerId }, data });
};
*/
