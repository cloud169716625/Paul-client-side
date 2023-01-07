import { getConfig } from 'lib';

// UserAppSettings End-Points
// TODO: Fix module name once backend issue is resolved
 const userAppSettingsConfig = (action) =>
  getConfig({ module: 'Settings', action });
 const updateAutobillConfig = (action) =>
  getConfig({ module: 'Settings', action });
// Get User Settings
export const getUserAppSettingsConfig = (id) => {
  return {
    url: `/api/v1/client/userappsettings/getuserappsettingbyuserid/${id}`,
    config: userAppSettingsConfig('View'),
  };
};


//
export const updateAutoBillStateConfig = (id) =>{
  return {
    url: `/api/v1/client/userappsettings/autobill/${id}`,
    config:  updateAutobillConfig('Update')  
  };
}
// Update User Settings
export const updateUserAppSettings = ({ id }) => {
  return {
    url: `/api/v1/client/userappsettings/${id}`,
    // config: userAppSettingsConfig('Update'),
  };
};
// Update User Settings
export const addUserAppSettings = () => {
  return {
    url: `/api/v1/admin/userappsettings`,
    config: userAppSettingsConfig('Create'),
  };
};
