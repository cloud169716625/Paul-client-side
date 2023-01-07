import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: null,
};

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCountLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setCount: (state, { payload }) => {
      state.data = payload;
    },
  },
});

const { reducer, actions } = countSlice;
export const { setCountLoading, setCount } = actions;

export default reducer;
