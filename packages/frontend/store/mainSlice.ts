import { createSlice } from "@reduxjs/toolkit";

export type InitialMainState = {
  main: {
    loading: boolean;
    modal: { show: boolean; type: string; message: string };
    isLogIn: boolean;
    user: {
      name: string;
      company: string;
      email: string;
      password: string;
    };
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
    user: {
      name: "",
      company: "",
      email: "",
      password: "",
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
    setIsLogin: (state, { payload }) => {
      state.isLogIn = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const {
  setLoading,
  showModal,
  hideModal,
  setIsLogin,
  setUser,
} = slice.actions;
export const getLoading = (state: InitialMainState) => state.main.loading;
export const getModalInfo = (state: InitialMainState) => state.main.modal;
export const getLoginStatus = (state: InitialMainState) => state.main.isLogIn;
export const getUser = (state: InitialMainState) => state.main.user;

export const mainReducer = slice.reducer;
