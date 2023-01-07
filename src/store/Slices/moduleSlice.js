import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appModules: [],
  userModules: [],
  clientModules: [],
  subuserModules:[],
  loading: false,
};
const settingSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    getAppLevelModules: (state, { payload }) => {
      state.appModules = payload;
    },
    getUserLevelModules: (state, { payload }) => {
      state.userModules = payload;
    },
    setModuleLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getClientLevelModules: (state, { payload }) => {
      state.clientModules = payload;
    },
    getSubuserLevelModules: (state, { payload }) => {
      state.subuserModules = payload;
    },
  },
});

const { reducer, actions } = settingSlice;

export const { getAppLevelModules, getUserLevelModules, setModuleLoading, getClientLevelModules, getSubuserLevelModules } =
  actions;
export default reducer;
