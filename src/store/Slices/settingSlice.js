import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  maintenance: false,
  suspended: false,
  message: null,
  isIdle: false,
  settings: {},
};
const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    checkMaintenancePending: (state) => {
      state.isLoading = true;
    },
    checkMaintenanceSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.maintenance = payload.isMaintenanceOn;
    },
    checkMaintenanceFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
    accountSuspended: (state) => {
      state.suspended = true;
    },
    initiateLockScreen: (state) => {
      state.isIdle = true;
      // localStorage.removeItem('AuthToken__client');
    },
    closeLockScreen: (state) => {
      state.isIdle = false;
    },
    fetchSettingsPending: (state) => {
      state.isLoading = true;
    },
    fetchSettingsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.settings = payload;
    },
    fetchSettingsFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = settingSlice;

export const {
  checkMaintenancePending,
  checkMaintenanceSuccess,
  checkMaintenanceFail,
  accountSuspended,
  initiateLockScreen,
  closeLockScreen,
  fetchSettingsPending,
  fetchSettingsSuccess,
  fetchSettingsFail

} = actions;
export default reducer;
