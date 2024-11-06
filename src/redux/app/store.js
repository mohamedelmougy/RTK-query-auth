import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
  devTools: import.meta.env.VITE_NODE_ENV === "development",
});

setupListeners(store.dispatch)