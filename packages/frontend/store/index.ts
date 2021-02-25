import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { mainReducer } from "./mainSlice";
import { offersReducer } from "./offersSlice";

export const store = configureStore({
  reducer: { main: mainReducer, offers: offersReducer },
  middleware: [thunk],
});
