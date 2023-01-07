import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
  userLogs: [],
  loading: false,
  loginSessions: [],
  loginSessionsLoading: false,
};
const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    getLogsSlice: (state, { payload }) => {
      state.logs = payload;
    },
    getUserLogsSlice: (state, { payload }) => {
      state.logs = payload;
    },
    getLoginSessionsSlice: (state, { payload }) => {
      state.loginSessions = payload;
    },
    setLogsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setLoginSessionsLoading: (state, { payload }) => {
      state.loginSessionsLoading = payload;
    },
  },
});

const { reducer, actions } = logsSlice;

export const {
  getLogsSlice,
  getUserLogsSlice,
  getLoginSessionsSlice,
  setLogsLoading,
  setLoginSessionsLoading,
} = actions;
export default reducer;
