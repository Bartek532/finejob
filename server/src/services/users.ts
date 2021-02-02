import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findUserByEmail = (email: string) => {
  return prisma.user.findFirst({ where: { email } });
};

export const createUser = (name: string, email: string, password: string) => {
  return prisma.user.create({ data: { name, email, password } });
};
