import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandId: null,
  brand: {
    base64Logo: "/icon/logo.svg",
    name: "reliable",
  },
  loading: false,
};
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrandId(state, { payload }) {
      state.brandId = payload;
    },
    getBrandPending(state) {
      state.loading = true;
    },
    getBrandSuccess(state, { payload }) {
      localStorage.setItem("brandId", payload.id);
      state.loading = false;
      state.brandId = payload.id;
      if (payload.base64Logo) state.brand.base64Logo = payload.base64Logo;
      if (payload.name) state.brand.name = payload.name;
    },
    getBrandFail(state) {
      localStorage.removeItem("brandId");
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = brandSlice;

export const { setBrandId, getBrandPending, getBrandSuccess, getBrandFail } =
  actions;

export default reducer;
