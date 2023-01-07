import {
  getProductsConfig,
  getProductsByIDConfig,
  updateProductByIDConfig,
  createProductConfig,
  axios,
} from 'lib';
import { deleteProductByIDConfig } from 'lib/requests';

// Get All Products
export const getProductsCall = async () => {
  const res = await axios.post(
    getProductsConfig().url,
    {
      advancedSearch: {
        fields: [''],
        keyword: '',
      },
      keyword: '',
      pageNumber: 0,
      pageSize: 0,
      orderBy: [''],
    },
    getProductsConfig().config
  );
  return res;
};

// Get Cancelled Products
export const getCancelledProductsCall = async () => {
  const res = await axios.post(
    getProductsConfig().url,
    {
      advancedSearch: {
        fields: ['status'],
        keyword: '2',
      },
      keyword: '',
      pageNumber: 0,
      pageSize: 0,
      orderBy: [''],
    },
    getProductsConfig().config
  );
  return res;
};

// Get Products by Client ID
export const getProductsByClientIDCall = async ({ clientId }) => {
  const res = await axios.post(
    getProductsConfig().url,
    {
      advancedSearch: {
        fields: ['assignedToClientId'],
        keyword: clientId,
      },
      keyword: '',
      pageNumber: 0,
      pageSize: 0,
      orderBy: [''],
    },
    getProductsConfig().config
  );
  return res;
};

// Get Products By ID
export const getProductsByIDCall = async (id) => {
  const { url, config } = getProductsByIDConfig(id);
  const res = await axios.get(url, config);
  return res;
};

// Update Product By ID
export const updateProductsByIDCall = async (id, data) => {
  const res = await axios.put(updateProductByIDConfig(id).url, data);
  return res;
};

// Create Product Call
export const createProductCall = async (data) => {
  const res = await axios.post(createProductConfig().url, data);
  return res;
};

// Delete Product By ID
export const deleteProductByIDCall = async (id) => {
  const res = await axios.delete(deleteProductByIDConfig(id).url);
  return res;
};
