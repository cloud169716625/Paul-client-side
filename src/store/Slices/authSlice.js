import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  rToken: null,
  adminToken: null,
  isLoggedIn: false,
  status: "",
  message: null,
  updateStatus: "",
  isLoading: false,
  authUri: "",
  hasMFA: false,
  hasOTP: false,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    autoAuthenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
      if (payload.adminSession) {
        state.adminSession = payload.adminSession
      }
    },
    initAuthenticationPending(state) {
      state.isLoading = true;
    },
    initAuthenticationSuccess(state, { payload }) {
      state.token = payload.token;
      state.rToken = payload.refreshToken;
      state.isLoading = false;
    },
    initAuthenticationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    authenticationPending(state) {
      state.isLoading = true;
    },
    authenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    authenticationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    setAdminSession(state, { payload }) {
      state.adminSession = payload;
    },
    updatedAuthUserData(state, { payload }) {
      state.user = { ...state.user, ...payload };
    },
    verificationPending(state) {
      state.isLoading = true;
    },
    verificationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    verificationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    fetchAuthentorUriPending(state) {
      state.isLoading = true;
    },
    fetchAuthentorUriSuccess(state, { payload }) {
      state.isLoading = false;
      state.authUri = payload;
    },
    fetchAuthentorUriFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    forgotPasswordPending(state) {
      state.isLoading = true;
    },
    forgotPasswordSuccess(state) {
      state.isLoading = false;
    },
    forgotPasswordFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
    resetPasswordPending(state) {
      state.isLoading = true;
    },
    resetPasswordSuccess(state, { payload }) {
      state.isLoading = false;
    },
    resetPasswordFail(state, { payload }) {
      state.isLoading = false;
    },
    confirmOtpPending(state) {
      state.isLoading = true;
    },
    confirmOtpSuccess(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    confirmOtpFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
    ChangeMfaStatus(state) {
      state.hasMFA = true;
    },
    logout(state) {
      state.user = {};
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("AuthToken__client");
      localStorage.removeItem("CurrentUser__client");
    },
  },
});
const { reducer, actions } = authSlice;

export const {
  autoAuthenticationSuccess,
  initAuthenticationPending,
  initAuthenticationSuccess,
  initAuthenticationFail,
  authenticationPending,
  authenticationSuccess,
  authenticationFail,
  setAdminSession,
  updatedAuthUserData,
  verificationPending,
  verificationSuccess,
  verificationFail,
  resetPasswordPending,
  resetPasswordSuccess,
  resetPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  forgotPasswordFail,
  confirmOtpPending,
  confirmOtpSuccess,
  confirmOtpFail,
  fetchAuthentorUriPending,
  fetchAuthentorUriSuccess,
  fetchAuthentorUriFail,
  ChangeMfaStatus,
  logout,
} = actions;

export default reducer;
