import { configureStore } from "@reduxjs/toolkit";

import basketReducer from "./basket";
import productsReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basketProduct: basketReducer,
  },
});