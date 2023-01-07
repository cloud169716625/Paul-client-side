import { getConfig } from "./getConfig";

const prefix = `/api/v1/client/bills`;

const getBillsConfig = (action) => getConfig({ module: 'Invoices', action });

export const getBillingsConfig = () => ({
  url: `${prefix}/getallinvoices`,
  config: getBillsConfig('View'),
});

export const createBillingConfig = () => ({
  url: `${prefix}/`,
  config: getBillsConfig('Create'),
});

export const updateBillingConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: getBillsConfig('Update'),
});

export const deleteBillingConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: getBillsConfig('Delete'),
});

export const getTransactionsConfig = () => ({
  url: `${prefix}/transactions/search`,
  data: {
    advancedSearch: {
      fields: [],
      keyword: ""
    },
    keyword: "",
    pageNumber: 0,
    pageSize: 0,
    orderBy: ["id"]
  },
  config: getBillsConfig('Search')
});

export const getUnpaidInvoiceCountConfig = (cliendId) => ({
  url: `${prefix}/unpaid/${cliendId}`,
  config: getBillsConfig('Search'),
});
