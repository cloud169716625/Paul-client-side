import { getConfig } from './getConfig';
// const Products = 'Products';
const invoiceConfig = (action) => getConfig({ module: 'Products', action });

// GET ALL Invoice History Table
export const getInvoiceHistoryConfig = () => ({
    url: `/api/v1.0/client/bills/getallinvoices`,
    config: invoiceConfig('View'),
  });

  //GET Invoice By Id
export const getInvoiceByIdConfig = (id) => ({
    url: `/api/v1.0/client/bills/${id}`,
    config: invoiceConfig('View'),
  });