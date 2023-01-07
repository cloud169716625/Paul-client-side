import {
  getError,
  axios,
  getAppModulesConfig,
  getUserModulesConfig,
  getClientAppModulesConfig,
  getSubuserAppModulesConfig,
} from "lib";
import { toast } from "react-toastify";
import {
  getAppLevelModules,
  getUserLevelModules,
  setModuleLoading,
  getClientLevelModules,
  getSubuserLevelModules,
} from "store/Slices/moduleSlice";

export const getAppModules = () => {
  return async (dispatch) => {
    setModuleLoading(true);
    try {
      const { url, config } = getAppModulesConfig();
      const res = await axios.get(url, config);
      dispatch(getAppLevelModules(res?.data?.data));
      setModuleLoading(false);
    } catch (e) {
      toast.error(getError(e));
      setModuleLoading(false);
    }
  };
};

export const getUserModules = ({ id }) => {
  return async (dispatch) => {
    setModuleLoading(true);
    try {
      const { url, config } = getUserModulesConfig(id);
      const res = await axios.get(url, config);
      dispatch(getUserLevelModules(res?.data?.data));
      setModuleLoading(false);
    } catch (e) {
      toast.error(getError(e));
      setModuleLoading(false);
    }
  };
};

export const getClientAppModules = () => {
  return async (dispatch) => {
    setModuleLoading(true);
    try {
      const { url, config } = getClientAppModulesConfig();
      const res = await axios.get(url, config);
      dispatch(getClientLevelModules(res?.data?.data));
      setModuleLoading(false);
    } catch (e) {
      toast.error(getError(e));
      setModuleLoading(false);
    }
  };
};

export const getSubuserAppModules = () => {
  return async (dispatch) => {
    setModuleLoading(true);
    try {
      const { url, config } = getSubuserAppModulesConfig();
      const res = await axios.get(url, config);
      dispatch(getSubuserLevelModules(res?.data?.data));
      setModuleLoading(false);
    } catch (e) {
      toast.error(getError(e));
      setModuleLoading(false);
    }
  };
};
