import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { mainReducer } from "./mainSlice";

export const store = configureStore({
  reducer: { main: mainReducer },
  middleware: [thunk],
});
