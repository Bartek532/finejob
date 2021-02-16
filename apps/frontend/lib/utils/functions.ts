import axios from "axios";
import { LOCATION_API_URL } from "./consts";

export const addRandomSalaryToOffer = (arr: Array<any>) => {
  return arr.map(item => ({
    ...item,
    salary: Math.floor(Math.random() * (30000 - 4000)) + 4000,
  }));
};

export const getCityNameByCoordinates = async (lat: number, lng: number) => {
  const { data } = await axios.get(
    `${LOCATION_API_URL}/reverse.php?key=195e70003d0429&lat=${lat}&lon=${lng}&format=json`
  );

  return data;
};
