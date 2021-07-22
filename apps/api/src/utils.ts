import type { Offer, Query } from "@finejob/types";

export const getRandomSalary = () => {
  return Math.floor(Math.random() * (30000 - 4000)) + 4000;
};

export const normalizeSalaryInOffer = (offer: Offer) => {
  return {
    ...offer,
    salary: offer.employment_types[0]?.salary?.to || getRandomSalary(),
  };
};

export const builtQueryToFetchOffers = (query: Query) => {
  const aliases: Record<keyof Query, string> = {
    q: "keywords[]",
    location: "locations[]",
    skills: "skills[]",
    page: "page",
  };
  return Object.entries(query)
    .map(([queryParam, queryValue]) => {
      if (!aliases[queryParam as keyof Query]) {
        return;
      }

      return [aliases[queryParam as keyof Query], queryValue].join("=");
    })
    .join("&");
};
