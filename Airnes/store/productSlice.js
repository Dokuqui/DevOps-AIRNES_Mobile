import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIRequest, API_URL } from "../components/util/helper";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const result = await APIRequest("get", `Products`);
  if (!result.success || !result.return) {
    throw new Error("Error fetching products");
  }
  const products = result.return.map((product) => ({
    id: product.ProductId,
    title: product.Name,
    description: product.Description,
    image: product.Pictures?.[0]?.Link ? `${API_URL}/${product.Pictures[0].Link}` : "/image/placeholder.webp",
    price: product.Price,
    quantity: product.Stock,
  }));
  return products;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
