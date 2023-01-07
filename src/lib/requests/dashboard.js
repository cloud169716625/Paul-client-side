import { getConfig } from 'lib';
const brandsConfig = (action) => getConfig({ module: 'Dashboard', action });

const prefix = `api/v1/client/dashboard`;
export const getDashboardConfig = () => ({
  url: `${prefix}`,
  config: brandsConfig('View'),
});


