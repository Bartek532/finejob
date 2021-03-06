import { PrismaClient } from "@prisma/client";
import { fetchSingleOffer } from "./offers";
import type { UserRegisterData } from "@finejob/types";
const prisma = new PrismaClient();

export const findUserByEmail = (email: string) => {
  return prisma.user.findFirst({ where: { email } });
};

export const createUser = ({
  name,
  email,
  company,
  password,
}: UserRegisterData) => {
  return prisma.user.create({ data: { name, email, company, password } });
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const fetchSavedOffer = (userId: number, offerId: string) => {
  return prisma.userOfferLibrary.findUnique({
    where: { offerId_userId: { userId, offerId } },
  });
};

export const fetchCreatedOffer = (userId: number, offerId: string) => {
  return prisma.offer.findFirst({
    where: { AND: [{ id: offerId }, { userId }] },
  });
};

export const changeUserData = (
  userId: number,
  { name, company, email, password }: UserRegisterData,
) => {
  return prisma.user.update({
    data: { name, company, email, password },
    where: { id: userId },
  });
};

export const addOfferToUserLibrary = (userId: number, offerId: string) => {
  return prisma.userOfferLibrary.create({
    data: {
      offerId,
      User: { connect: { id: userId } },
    },
  });
};

export const deleteOfferFromLibrary = (userId: number, offerId: string) => {
  return prisma.userOfferLibrary.delete({
    where: { offerId_userId: { userId, offerId } },
  });
};

export const fetchUserLibrary = async (userId: number) => {
  const offers = await prisma.userOfferLibrary.findMany({
    where: { userId },
  });

  const userLibrary = [];

  for (const offer of offers) {
    const fetchedOffer = await fetchSingleOffer(offer.offerId);
    if (fetchedOffer) {
      userLibrary.push(fetchedOffer);
    }
  }

  return userLibrary;
};

export const fetchOffersCreatedByUser = (userId: number) => {
  return prisma.offer.findMany({
    where: { userId },
  });
};
