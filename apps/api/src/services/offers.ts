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
            company_name: {
              contains: decodeURIComponent(query.q),
              mode: "insensitive",
            },
          },
          {
            city: {
              contains:
                decodeURIComponent(query.location) ||
                decodeURIComponent(query.q),
              mode: "insensitive",
            },
          },
          {
            body: {
              contains: decodeURIComponent(query.q),
              mode: "insensitive",
            },
          },
          {
            skills: {
              contains: decodeURIComponent(query.skill),
              mode: "insensitive",
            },
          },
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
    return {
      ...offer,
      skills: offer.skills
        ?.split(",")
        .map((skill: string) => ({ name: skill.trim() })),
    };
  }

  const { data }: { data: Offer } = await axios.get(
    `${process.env.JOBS_API_URL}/${offerId}`,
  );
  return normalizeSalaryInOffer(data);
};

type Experience = "junior" | "mid" | "senior";

export const addOffer = (userId: number, data: Offer & { skills: string }) => {
  return prisma.offer.create({
    data: {
      ...data,
      experience_level: data.experience_level as Experience,
      userId,
    },
  });
};

export const changeOffer = (
  offerId: string,
  data: Offer & { skills: string },
) => {
  return prisma.offer.update({
    where: { id: offerId },
    data: { ...data, experience_level: data.experience_level as Experience },
  });
};

export const removeOffer = async (offerId: string) => {
  await prisma.userOfferLibrary.deleteMany({ where: { offerId } });

  return await prisma.offer.delete({
    where: { id: offerId },
  });
};
