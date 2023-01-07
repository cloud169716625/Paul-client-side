import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: null,
  loading: false,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setAppSettingsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getAppSettings: (state, { payload }) => {
      state.settings = payload;
    },
  },
});

const { actions, reducer } = appSettingsSlice;

export const {
  setAppSettingsLoading,
  getAppSettings,
} = actions;

export default reducer;
