import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findUserByEmail = (email: string) => {
  return prisma.user.findFirst({ where: { email } });
};

export const createUser = (
  name: string,
  email: string,
  company: string,
  password: string
) => {
  return prisma.user.create({ data: { name, email, company, password } });
};

export const findUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};

export const findOfferInLibrary = (userId: number, offerId: string) => {
  return prisma.userOfferLibrary.findFirst({
    where: { AND: [{ user_id: userId }, { offer_id: offerId }] },
  });
};

export const addOfferToUserLibrary = (userId: number, offerId: string) => {
  return prisma.userOfferLibrary.create({
    data: {
      offer_id: offerId,
      User: { connect: { id: userId } },
    },
  });
};

export const deleteOfferFromLibrary = (userId: number, offerId: string) => {
  return prisma.userOfferLibrary.delete({
    where: { offer_id_user_id: { user_id: userId, offer_id: offerId } },
  });
};
