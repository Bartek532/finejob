import { createSlice } from "@reduxjs/toolkit";

export type InitialMainState = {
  main: {
    loading: boolean;
    modal: { show: boolean; type: string; message: string };
    isLogIn: boolean;
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
  },
});

export const { setLoading, showModal, hideModal, setIsLogin } = slice.actions;
export const getLoading = (state: InitialMainState) => state.main.loading;
export const getModalInfo = (state: InitialMainState) => state.main.modal;
export const getLoginStatus = (state: InitialMainState) => state.main.isLogIn;

export const mainReducer = slice.reducer;
