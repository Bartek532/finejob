import type { Offer } from "./types";

export const addRandomSalaryToOffer = (item: Offer) => {
  return { ...item, salary: Math.floor(Math.random() * (30000 - 4000)) + 4000 };
};
