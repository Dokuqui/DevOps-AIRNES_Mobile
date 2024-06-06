import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIRequest } from "../components/util/helper";

export const addBasketItem = createAsyncThunk(
  "basket/addBasketItem",
  async (productToAddToBasket, { rejectWithValue }) => {
    try {
      const response = await APIRequest("post", "ProductOrder/add", {
        ProductId: productToAddToBasket.ProductId,
        Quantity: productToAddToBasket.Quantity,
        Price: productToAddToBasket.Price,
      });

      if (response.success) {
        return productToAddToBasket;
      } else {
        return rejectWithValue(response.error);
      }
    } catch (error) {
      return rejectWithValue(error.message ? error.message : error.toString());
    }
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    ids: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    removeProduct(state, action) {
      const productId = action.payload;
      const existingProduct = state.items.find(
        (product) => product.ProductId === productId
      );
      if (existingProduct) {
        state.items = state.items.filter(
          (product) => product.ProductId !== productId
        );
        state.totalQuantity -= existingProduct.Quantity;
        state.totalPrice -= existingProduct.Price * existingProduct.Quantity;
      }
    },
    clearBasket: (state) => {
      state.items = [];
      state.ids = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBasketItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBasketItem.fulfilled, (state, action) => {
        const productIndex = state.items.findIndex(
          (product) => product.id === action.payload.ProductId
        );
        const { ProductId, Quantity, Price } = action.payload;

        if (productIndex === -1) {
          state.items.push({ ...action.payload, quantity: Quantity });
          state.ids.push(ProductId);
          state.totalQuantity += Quantity;
          state.totalPrice += Price * Quantity;
        } else {
          state.items[productIndex].quantity += Quantity;
          state.totalQuantity += Quantity;
          state.totalPrice += Price * Quantity;
        }
        state.status = "succeeded";
      })
      .addCase(addBasketItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearBasket, removeProduct } = basketSlice.actions;
export default basketSlice.reducer;
