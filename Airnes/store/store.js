import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./favorites";
import basketReducer from "./basket";

export const store = configureStore({
  reducer: {
    favoriteProduct: favoritesReducer,
    basketProduct: basketReducer,
  },
});