import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    brands: [],
    loading: false
};
const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        getBrands: (state, { payload }) => {
            state.brands = payload;
        },
        setBrandsLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});

const { reducer, actions } = brandsSlice;
export const { getBrands, setBrandsLoading } = actions;

export default reducer;
