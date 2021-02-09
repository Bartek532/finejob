import { createSlice } from "@reduxjs/toolkit";

type InitialMainState = {
  query: string;
  loading: boolean;
};

export const slice = createSlice({
  name: "main",
  initialState: {
    loading: false,
    modal: { show: false, type: "", message: "" },
  },
  reducers: {
    setLoading: (state, item) => {
      state.loading = item.payload;
    },
    showModal: (state, item) => {
      state.modal = {
        show: true,
        type: item.payload.type,
        message: item.payload.message,
      };
    },
    hideModal: state => {
      state.modal = { ...state.modal, show: false };
    },
  },
});

export const { setLoading, showModal, hideModal } = slice.actions;
export const getQuery = (state: InitialMainState) => state.query;
export const getLoading = (state: InitialMainState) => state.loading;

export const mainReducer = slice.reducer;
