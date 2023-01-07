import { toast } from "react-toastify";

import {
  getError,
  axios,
  getLogsConfig,
  getUserLoginSessions,
  getLogsByUserIDConfig,
} from "lib";
import {
  getLogsSlice,
  getUserLogsSlice,
  setLogsLoading,
  setLoginSessionsLoading,
  getLoginSessionsSlice,
} from "store/Slices/logsSlice";

export const getLogs = () => {
  return async (dispatch) => {
    dispatch(setLogsLoading(true));
    // if (token) {
    try {
      const { url, defaultData, config } = getLogsConfig();
      const res = await axios.post(url, defaultData, config);
      await dispatch(getLogsSlice(res?.data?.data));
      dispatch(setLogsLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setLogsLoading(false));
    }
  };
  // };
};

export const getLogsByUserID = (id) => {
  return async (dispatch) => {
    dispatch(setLogsLoading(true));
    // if (token) {
    try {
      const { url, defaultData, config } = getLogsByUserIDConfig(id);
      const res = await axios.post(url, defaultData, config);
      await dispatch(getLogsSlice(res?.data?.data));
      dispatch(setLogsLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setLogsLoading(false));
    }
  };
  // };
};

export const getUserLogs = (uid) => {
  return async (dispatch) => {
    dispatch(setLogsLoading(true));
    // if (token) {
    try {
      const { url, defaultData, config } = getLogsByUserIDConfig(uid);
      const res = await axios.post(url, defaultData, config);
      await dispatch(getUserLogsSlice(res?.data?.data));
      dispatch(setLogsLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setLogsLoading(false));
    }
  };
  // };
};

export const getLoginSessions = (id) => {
  return async (dispatch) => {
    dispatch(setLoginSessionsLoading(true));
    // if (token) {
    try {
      const { url } = getUserLoginSessions(id);
      const res = await axios.get(url);
      await dispatch(getLoginSessionsSlice(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setLoginSessionsLoading(false));
    }
  };
  // };
};
