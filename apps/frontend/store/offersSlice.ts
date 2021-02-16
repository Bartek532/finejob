import { createSlice } from "@reduxjs/toolkit";
import type { Offer } from "../types";

export type InitialOffersState = {
  offers: {
    actualSelectedOffer: Offer;
    allOffers: Offer[];
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
