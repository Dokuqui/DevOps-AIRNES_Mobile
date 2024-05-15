import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    ids: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToBasket: (state, action) => {
      const productIndex = state.items.findIndex(product => product.id === action.payload.id);
      const { id, price, quantity } = action.payload;
    
      if (productIndex === -1) {
        state.items.push({...action.payload, quantity: quantity});
        state.ids.push(id);
        state.totalQuantity += quantity;
        state.totalPrice += price * quantity;
      } else {
        state.items[productIndex].quantity += quantity;
        state.totalQuantity += quantity;
        state.totalPrice += price * quantity;
      }
    },
    clearBasket: (state) => {
      state.items = [];
      state.ids = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },   
  },
});

export const addToBasket = basketSlice.actions.addToBasket;
export const clearBasket = basketSlice.actions.clearBasket;
export default basketSlice.reducer;
