import axios from "axios";
import { LOCATION_API_URL } from "./consts";
import type { LocationAPIResponse } from "../../types";

export const getCityNameByCoordinates = async (lat: number, lng: number) => {
  const { data }: { data: LocationAPIResponse } = await axios.get(
    `${LOCATION_API_URL}/reverse.php?key=195e70003d0429&lat=${lat}&lon=${lng}&format=json`,
  );

  return data;
};

export const prepareQueryToSearch = (query: string) => {
  return encodeURIComponent(query.trim());
};
