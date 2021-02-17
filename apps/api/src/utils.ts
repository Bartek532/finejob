export const addRandomSalaryToOffers = (arr: Array<any>) => {
  return arr.map(item => ({
    ...item,
    salary: Math.floor(Math.random() * (30000 - 4000)) + 4000,
  }));
};
