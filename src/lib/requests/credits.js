import { getConfig } from "./getConfig";

const prefix = `/api/v1/client/credit`;

const getCreditConfig = (action) => getConfig({ module: "Credits", action });

export const createCreditConfig = () => ({
  url: `${prefix}/`,
  config: getCreditConfig("Create"),
});

export const payAllInvoicesConfig = () => ({
  url: `${prefix}/payment/all`,
  // config: getCreditConfig('Create'),
});

export const getCurrentCreditBalanceConfig = () => ({
  url: `${prefix}`,
  config: getCreditConfig("View"),
});
