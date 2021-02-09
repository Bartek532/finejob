import { createSlice } from "@reduxjs/toolkit";

export type InitialOffersState = {
  offers: {
    actualSelectedOffer: any;
    allOffers: any;
  };
};

export const slice = createSlice({
  name: "offers",
  initialState: {
    actualSelectedOffer: {},
    allOffers: [],
  },
  reducers: {
    setOffers: (state, { payload }) => {
      state.allOffers = payload;
    },
    setActualSelectedOffer: (state, { payload }) => {
      state.actualSelectedOffer = state.allOffers.filter(id => id === payload);
    },
  },
});

export const { setOffers, setActualSelectedOffer } = slice.actions;
export const getAllOffers = (state: InitialOffersState) =>
  state.offers.allOffers;
export const getActualSelectedOffer = (state: InitialOffersState) =>
  state.offers.actualSelectedOffer;

export const offersReducer = slice.reducer;
