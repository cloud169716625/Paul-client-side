import { getConfig } from "./getConfig";

const prefix = '/api/v1.0/client/products';

const getCountConfig = (action) => getConfig({ module: 'Products', action });

export const getDataCountConfig = () => ({
  url: `${prefix}/productcounts`,
  config: getCountConfig('View'),
});