import { logoColors } from "./consts";

export const addRandomColorToLogos = (arr: Array<any>) => {
  return arr.map(item => ({
    ...item,
    color: logoColors[Math.floor(Math.random() * logoColors.length)],
  }));
};
