import { createSlice } from "@reduxjs/toolkit";

export type InitialMainState = {
  main: {
    loading: boolean;
    modal: { show: boolean; type: string; message: string };
    isLogIn: boolean;
    query: string;
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
    isLogIn: false,
    query: "",
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
    setIsLogin: (state, { payload }) => {
      state.isLogIn = payload;
    },
    setLastQuery: (state, { payload }) => {
      state.query = payload;
    },
  },
});

export const {
  setLoading,
  showModal,
  hideModal,
  setIsLogin,
  setLastQuery,
} = slice.actions;
export const getLoading = (state: InitialMainState) => state.main.loading;
export const getModalInfo = (state: InitialMainState) => state.main.modal;
export const getLoginStatus = (state: InitialMainState) => state.main.isLogIn;
export const getLastQuery = (state: InitialMainState) => state.main.query;

export const mainReducer = slice.reducer;
