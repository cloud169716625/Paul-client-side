import {
  axios,
  getError,
  getSettingsByTenant,
} from "lib";
import { toast } from "react-toastify";
import {
  getAppSettings,
  setAppSettingsLoading,
} from "store/Slices";

// Get Settings By Tenant
export const getAppSettingsByTenant = (values) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      if (values?.isAdmin) {
        const { url, config } = getSettingsByTenant();
        const response = await axios.get(url, config);
        dispatch(getAppSettings(response.data.data));
      } else {
        const { url, config } = getSettingsByTenant();
        const response = await axios.get(url, config);
        dispatch(getAppSettings(response.data.data));
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};