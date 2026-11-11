import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product, NewProduct } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  creating: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(`${API_URL}/api/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return (await res.json()) as Product[];
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: NewProduct) => {
    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to create product");
    const data = await res.json();
    // API returns an array with the created product
    return (Array.isArray(data) ? data[0] : data) as Product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      // Create
      .addCase(createProduct.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.creating = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creating = false;
        state.error = action.error.message || "Failed to create product";
      });
  },
});

export default productsSlice.reducer;
