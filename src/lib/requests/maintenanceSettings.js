import { getConfig } from 'lib';

const maintenanceSettingsConfig = (action) =>
  getConfig({ module: 'MaintenanceSettings', action });

// Get Maintenance Settings
export const getMaintenanceSettingsConfig = () => ({
  url: `/api/maintenance/maintenancemode/admin`,
  config: maintenanceSettingsConfig('View'),
});

// Post Maintenance Settings
export const postMaintenanceSettingsConfig = () => ({
  url: `/api/maintenance/togglemaintenancemode`,
  config: maintenanceSettingsConfig('Update'),
});
