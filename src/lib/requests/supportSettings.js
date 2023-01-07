import { getConfig } from './getConfig';

const supportConfig = (action) => getConfig({ module: 'Settings', action });
const prefix = `api/v1/client/supportsettings`;

// Get Billing Settings By Tenant
export const getSupportSettingsByTenantConfig = () => ({
  url: `${prefix}/getsettingswithtenant/client`,
  config: supportConfig('View'),
});

// Update Billing Settings
export const updateSupportSettingsConfig = ({ id }) => ({
  url: `${prefix}/${id}`,
  config: supportConfig('Update'),
});
