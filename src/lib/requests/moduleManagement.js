import { getConfig } from 'lib';
const UserModuleManagement = 'Identity';

// ModuleManagement End-Points
export const getAppModulesConfig = () => ({
  url: `/api/modulemanagement/getmodulebytenant/admin`,
  config: getConfig({ module: UserModuleManagement, action: 'View' }),
});

// UserModuleManagement End-Points
// Get User Modules
export const getUserModulesConfig = (userId) => ({
  url: `/api/usermodulemanagement/getmodulebyuser/${userId}`,
  config: getConfig({ module: UserModuleManagement, action: 'View' }),
});
// Add User Module
export const addUserModule = () => ({
  url: `/api/usermodulemanagement`,
  config: getConfig({ module: UserModuleManagement, action: 'Create' }),
});
// Update User Module (mid = Module ID)
export const updateUserModule = (mid) => ({
  url: `/api/usermodulemanagement/${mid}`,
  config: getConfig({ module: UserModuleManagement, action: 'Update' }),
});

export const getClientAppModulesConfig = () => ({
  url: "/api/modulemanagement/getmodulebytenant/client",
});

export const getSubuserAppModulesConfig = () => ({
  url: "/api/modulemanagement/getmodulebytenant/subuser",
  config: getConfig({ module: UserModuleManagement, action: 'View' }),
});