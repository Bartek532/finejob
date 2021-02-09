import fetch from "node-fetch";

export const fetchAllOffers = async () => {
  const response = await fetch(
    `${process.env.BASE_API_URL}/1?app_id=${process.env.JOBS_API_APP_ID}&app_key=${process.env.JOBS_API_APP_KEY}`
  );

  return await response.json();
};

export const fetchOffersByLocation = async (
  location: string,
  perPage: string | number,
  page: string | number
) => {
  const response = await fetch(
    `${process.env.BASE_API_URL}/${page}?app_id=${process.env.JOBS_API_APP_ID}&app_key=${process.env.JOBS_API_APP_KEY}&results_per_page=${perPage}&where=${location}`
  );

  return await response.json();
};

export const fetchOffersByQuery = async (
  query: string,
  perPage: string | number,
  page: string | number
) => {
  const response = await fetch(
    `${process.env.BASE_API_URL}/${page}?app_id=${process.env.JOBS_API_APP_ID}&app_key=${process.env.JOBS_API_APP_KEY}&results_per_page=${perPage}&what=${query}`
  );

  return await response.json();
};
