import { logoColors } from "./consts";
import axios from "axios";
import { LOCATION_API_URL } from "./consts";

export const addRandomColorToLogos = (arr: Array<any>) => {
  return arr.map(item => ({
    ...item,
    color: logoColors[Math.floor(Math.random() * logoColors.length)],
  }));
};

export const getCityNameByCoordinates = async (lat: number, lng: number) => {
  const { data } = await axios.get(
    `${LOCATION_API_URL}/reverse.php?key=195e70003d0429&lat=${lat}&lon=${lng}&format=json`
  );

  return data;
};
