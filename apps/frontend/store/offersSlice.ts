import { createSlice } from "@reduxjs/toolkit";
import type { OfferWithSalary } from "../../types";

export type InitialOffersState = {
  offers: {
    isActualOfferSaved: boolean;
    allOffers: OfferWithSalary[];
    loadMore: boolean;
    lastOffersApiCallAddress: string;
    resultsPage: number;
  };
};

export const slice = createSlice({
  name: "offers",
  initialState: {
    isActualOfferSaved: false,
    allOffers: [],
    loadMore: false,
    lastOffersApiCallAddress: "",
    resultsPage: 1,
  },
  reducers: {
    setOffers: (state, { payload }) => {
      state.allOffers = payload;
    },
    setIsActualOfferSaved: (state, { payload }) => {
      state.isActualOfferSaved = payload;
    },
    setLastOffersApiCallAddress: (state, { payload }) => {
      state.lastOffersApiCallAddress = payload;
    },
    setLoadMore: (state, { payload }) => {
      state.loadMore = payload;
    },
    setResultsPage: (state, { payload }) => {
      state.resultsPage = payload;
    },
  },
});

export const {
  setOffers,
  setIsActualOfferSaved,
  setLastOffersApiCallAddress,
  setLoadMore,
  setResultsPage,
} = slice.actions;

export const getActualOfferSavedStatus = (state: InitialOffersState) =>
  state.offers.isActualOfferSaved;

export const getAllOffers = (state: InitialOffersState) =>
  state.offers.allOffers;

export const getLastAddress = (state: InitialOffersState) =>
  state.offers.lastOffersApiCallAddress;

export const getLoadMoreStatus = (state: InitialOffersState) =>
  state.offers.loadMore;

export const getActualResultsPage = (state: InitialOffersState) =>
  state.offers.resultsPage;

export const offersReducer = slice.reducer;
