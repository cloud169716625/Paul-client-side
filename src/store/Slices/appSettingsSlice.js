import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  billingSettings: null,
  maintenanceSettings: null,
  supportSettings: null,
  loading: false,
  settings: {
    dateFormat: 'DD/MM/YYYY HH:mm:ss',
  },
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
    getBillingSettings: (state, { payload }) => {
      state.billingSettings = payload;
    },
    getMaintenanceSettings: (state, { payload }) => {
      state.maintenanceSettings = payload;
    },
    getSupportSettings: (state, { payload }) => {
      state.supportSettings = payload;
    },
  },
});

const { actions, reducer } = appSettingsSlice;

export const {
  setAppSettingsLoading,
  getAppSettings,
  getBillingSettings,
  getMaintenanceSettings,
  getSupportSettings,
} = actions;

export default reducer;
