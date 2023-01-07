import { getConfig } from 'lib';

// User API Keys Management End-Points
// TODO: Change module name after fix from backend-devs
const apiKeyConfig = (action) => getConfig({ module: 'ManageSubUserApiKey', action });
// Get API Keys
export const getAPIKeysConfig = () => ({
  url: `/api/managesubuserapikey/search`,
  defaultData: {
    advancedSearch: {
      fields: [''],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
  },
  config: apiKeyConfig('View'),
});

// Add API Key
export const addAPIKeyConfig = () => ({
  url: `/api/managesubuserapikey`,
  config: apiKeyConfig('Create'),
});

// Get API Keys By User ID
export const getAPIKeysByUserIDConfig = (uid) => ({
  url: `/api/managesubuserapikey/search`,
  defaultData: {
    advancedSearch: {
      fields: [],
      keyword: uid,
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
  },
  config: apiKeyConfig('View'),
});

// Update API Key Settings
export const updateAPIKeySettingsConfig = (id) => ({
  url: `/api/managesubuserapikey/userapikeyupdate/${id}`,
  config: apiKeyConfig('Update'),
});

// Get API Key by ID
export const getAPIKeyByIDConfig = (id) => ({
  url: `/api/managesubuserapikey/${id}`,
  config: apiKeyConfig('View'),
});

// Update API Key Permissions
export const updateAPIKeyPermissionsConfig = (id) => ({
  url: `/api/managesubuserapikey/permissionsupdate/${id}`,
  config: apiKeyConfig('Update'),
});
// Delete API Key
export const deleteAPIKeyConfig = (id) => ({
  url: `/api/managesubuserapikey/${id}`,
  config: apiKeyConfig('Remove'),
});
