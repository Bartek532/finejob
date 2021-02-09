import { createSlice } from "@reduxjs/toolkit";

export type InitialMainState = {
  main: {
    query: string;
    loading: boolean;
    modal: { show: boolean; type: string; message: string };
  };
};

export const slice = createSlice({
  name: "main",
  initialState: {
    loading: false,
    modal: {
      show: false,
      type: "",
      message: "",
    },
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    showModal: (state, { payload }) => {
      state.modal = {
        show: true,
        type: payload.type,
        message: payload.message,
      };
    },
    hideModal: state => {
      state.modal = { ...state.modal, show: false };
    },
  },
});

export const { setLoading, showModal, hideModal } = slice.actions;
export const getQuery = (state: InitialMainState) => state.main.query;
export const getLoading = (state: InitialMainState) => state.main.loading;
export const getModalInfo = (state: InitialMainState) => state.main.modal;

export const mainReducer = slice.reducer;
