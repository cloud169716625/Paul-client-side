import {
  axios,
  getBillingSettingsByTenantConfig,
  getError,
  getMaintenanceSettingsConfig,
  getSettingsByTenant,
  getSupportSettingsByTenantConfig,
  postMaintenanceSettingsConfig,
  updateBillingSettingsConfig,
  updateSettingsConfig,
  updateSupportSettingsConfig,
} from "lib";
import { checkModule } from "lib/checkModule";
import { defaultTenant } from "lib/constants";
import { toast } from "react-toastify";
import {
  getAppSettings,
  getBillingSettings,
  getMaintenanceSettings,
  getSupportSettings,
  setAppSettingsLoading,
} from "store/Slices";

// Get Settings By Tenant
export const getAppSettingsByTenant = (values) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      if (values?.isAdmin) {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL}/api/settings/getsettingswithtenant/client`,
          {
            headers: {
              "Content-type": "application/json",
              "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
              tenant: defaultTenant,
            },
          }
        );
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

// Update Settings
export const updateAppSettings = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = updateSettingsConfig(id);
      const response = await axios.put(url, data, config);
      if (response.status === 200) {
        const { url, config } = getSettingsByTenant();
        const response = await axios.get(url, config);
        dispatch(getAppSettings(response.data.data));
        toast.success("Settings updated successfully");
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// Get Billing Settings
export const getBillingSettingsByTenant = (userModules) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    if (
      checkModule({ modules: userModules, module: "BillingSettings" })
        ?.permissions?.View
    ) {
      try {
        const { url, config } = getBillingSettingsByTenantConfig();
        const response = await axios.get(url, config);
        dispatch(getBillingSettings(response.data.data));
      } catch (error) {
        toast.error(getError(error));
      } finally {
        dispatch(setAppSettingsLoading(false));
      }
    }
  };
};

// Update Billing Settings
export const updateBillingSettings = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = updateBillingSettingsConfig(id);
      const response = await axios.put(url, data, config);
      if (response.status === 200) {
        const { url, config } = getBillingSettingsByTenantConfig();
        const response = await axios.get(url, config);
        dispatch(getBillingSettings(response.data.data));
        toast.success("Settings updated successfully");
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// Get Maintenance Settings
export const getMaintenanceSettingsByTenant = () => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = getMaintenanceSettingsConfig();
      const response = await axios.get(url, config);
      dispatch(getMaintenanceSettings(response?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// // Update Maintenance Settings
export const updateMaintenanceSettings = ({ data, isAdmin }) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      if (isAdmin) {
        const response = await axios.post(
          "/api/maintenance/togglemaintenancemode",
          data,
          {
            headers: {
              "Content-type": "application/json",
              "gen-api-key": process.env.REACT_APP_ADMIN_APIKEY,
              tenant: defaultTenant,
            },
          }
        );
        dispatch(getAppSettings(response.data.data));
      } else {
        const { url, config } = postMaintenanceSettingsConfig();
        const response = await axios.post(url, data, config);
        if (response.status === 200) {
          const { url, config } = getMaintenanceSettingsConfig();
          const response = await axios.get(url, config);
          dispatch(getMaintenanceSettings(response?.data));
          toast.success("Settings updated successfully");
        }
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// Get Support Settings By Tenant
export const getSupportSettingsByTenant = () => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = getSupportSettingsByTenantConfig();
      const response = await axios.get(url, config);
      dispatch(getSupportSettings(response.data.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};

// Update Support Settings
export const updateSupportSettings = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(setAppSettingsLoading(true));
    try {
      const { url, config } = updateSupportSettingsConfig({ id });
      const response = await axios.put(url, data, config);
      if (response.status === 200) {
        const { url, config } = getSupportSettingsByTenant();
        const response = await axios.get(url, config);
        dispatch(getSupportSettings(response?.data));
        toast.success("Settings updated successfully");
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setAppSettingsLoading(false));
    }
  };
};
