import { createSlice } from "@reduxjs/toolkit";

type InitialMainState = {
  query: string;
  loading: boolean;
};

export const slice = createSlice({
  name: "main",
  initialState: { loading: false },
  reducers: {
    setLoading: (state, item) => {
      state.loading = item.payload;
    },
  },
});

export const { setLoading } = slice.actions;
export const getQuery = (state: InitialMainState) => state.query;
export const getLoading = (state: InitialMainState) => state.loading;

export const mainReducer = slice.reducer;
