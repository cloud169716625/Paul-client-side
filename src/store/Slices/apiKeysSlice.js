import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiKeys: [],
  apiKey: null,
  paginationProps: {},
  loading: false,
};
const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    getAPIKeys: (state, { payload }) => {
      state.apiKeys = payload;
    },
    getAPIKeysPaginationProps: (state, { payload }) => {
      state.paginationProps = payload;
    },
    getAPIKey: (state, { payload }) => {
      state.apiKey = payload;
    },
    setAPILoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

const { reducer, actions } = apiKeysSlice;

export const { getAPIKeys, getAPIKey, setAPILoading, getAPIKeysPaginationProps } = actions;
export default reducer;
