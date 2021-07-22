import type { Offer } from "@finejob/types";

export const getRandomSalary = () => {
  return Math.floor(Math.random() * (30000 - 4000)) + 4000;
};

export const normalizeSalaryInOffer = (offer: Offer) => {
  return {
    ...offer,
    salary: offer.employment_types[0]?.salary?.to || getRandomSalary(),
  };
};
