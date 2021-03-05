import { PrismaClient } from "@prisma/client";
import axios from "axios";
import type { Offer, OfferWithSalary } from "@finejob/types";
import { addRandomSalaryToOffer } from "../utils";

const prisma = new PrismaClient();

type Query = {
  readonly q: string;
  readonly location: string;
  readonly full_time: string;
  readonly page: string;
};

export const fetchRecomendedOffers = async () => {
  const { data }: { data: Offer[] } = await axios.get(
    `${process.env.JOBS_API_URL}.json`,
  );

  return data.map(addRandomSalaryToOffer);
};

export const fetchOffers = async (query: Query) => {
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
        ],
      },
    })),
  ];

  const page = Number(query.page) || 0;

  const path = Object.entries(query)
    .map((item) => {
      if (item[0] === "q") {
        item[0] = "search";
      }

      return item;
    })
    .map((item) => item.join("="))
    .join("&");

  const { data }: { data: Offer[] } = await axios.get(
    `${process.env.JOBS_API_URL}.json?${path}`,
  );

  return [
    ...offers.slice(page * 50, (page + 1) * 50),
    ...data.map(addRandomSalaryToOffer),
  ];
};

export const fetchSingleOffer = async (id: string) => {
  const idIsNumber = !Number.isNaN(Number(id));
  if (idIsNumber) {
    const offer = await prisma.offer.findUnique({
      where: { id: Number(id) },
    });

    return offer;
  }

  const { data }: { data: Offer } = await axios.get(
    `${process.env.JOBS_API_URL}/${id}.json`,
  );
  return addRandomSalaryToOffer(data);
};

export const addOffer = async (
  userId: number,
  data: OfferWithSalary & { id: number },
) => {
  const offer = await prisma.offer.create({
    data: {
      ...data,
      salary: data.salary as string,
    },
  });
  await prisma.userOffer.create({ data: { userId, offerId: offer.id } });

  return offer;
};

export const removeOffer = async (userId: number, offerId: number) => {
  await prisma.userOffer.delete({
    where: { offerId_userId: { userId, offerId } },
  });
  return prisma.offer.delete({ where: { id: offerId } });
};
