import { getConfig } from './getConfig';

const getBillingSettingsConfig = (action) =>
  getConfig({ module: 'BillingSettings', action });

// Get Billing Settings By Tenant
export const getBillingSettingsByTenantConfig = () => ({
  url: `/api/v1/admin/billingsettings/getsettingswithtenant/admin`,
  config: getBillingSettingsConfig('View'),
});

// Update Billing Settings
export const updateBillingSettingsConfig = (id) => ({
  url: `/api/v1/admin/billingsettings/${id}`,
  config: getBillingSettingsConfig('Update'),
});
