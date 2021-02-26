import type { Offer, OfferWithSalary } from "@finejob/types";

export const addRandomSalaryToOffer = (item: Offer): OfferWithSalary => {
  return { ...item, salary: Math.floor(Math.random() * (30000 - 4000)) + 4000 };
};
