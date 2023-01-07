import { getConfig } from './getConfig';

// const Products = 'Products';
const productsConfig = (action) => getConfig({ module: 'Products', action });
const prefix = '/api/v1.0/client/products';
// Get all products
export const getProductsConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [''],
      keyword: '',
    },
    keyword: '',
    pageNumber: 1,
    pageSize: 5,
    orderBy: [''],
  },
  config: productsConfig('View'),
});

export const getFilteredProductsConfig = (status) => ({
  url: `${prefix}/getproducts/${status}`,
  config: productsConfig('View'),
})

// Get Product by ID
export const getProductsByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: productsConfig('View'),
});

// Update Product by ID
export const updateProductByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: productsConfig('Update'),
});

// Create a Product
export const createProductConfig = () => ({
  url: `${prefix}`,
  config: productsConfig('Create'),
});

// Delete Product by ID
export const deleteProductByIDConfig = (id) => ({
  url: `${prefix}/${id}`,
  config: productsConfig('Delete'),
});

// Suspend Product by ID
export const suspendProductByID = (id) => ({
  url: `${prefix}/${id}/suspension`,
  config: productsConfig('Update'),
});

// Cancel Product by ID
export const cancelProductByIDConfig = (id) => ({
  url: `${prefix}/${id}/cancellation`,
  config: productsConfig('Update'),
});

// Cancel Product by ID At The End Of Billing period
export const cancelProductAtEndByIDConfig = (id) => ({
  url: `${prefix}/${id}/cancellation/endofbilling`,
  config: productsConfig('Update'),
});

//Remove Cancellation Request
export const removeCancelRequestByIDConfig = (id) => ({
  url: `${prefix}/${id}/cancellation/remove`,
  config: productsConfig('Update'),
});

// Un-Suspend Product by ID
export const unSuspenseProductByID = (id) => ({
  url: `${prefix}/${id}/unsuspension`,
  config: productsConfig('Update'),
});

// Re-New Product by ID
export const renewProductByID = (id) => ({
  url: `${prefix}/${id}/renewal`,
  config: productsConfig('Update'),
});

// Terminate Product by ID
export const terminateProductByID = (id) => ({
  url: `${prefix}/${id}/termination`,
  config: productsConfig('Update'),
});
