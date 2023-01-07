import { toast } from "react-toastify";
import {
  axios,
  getError,
  getFilteredProductsConfig,
  getProductsConfig,
  getProductsByIDConfig,
  cancelProductByIDConfig,
  cancelProductAtEndByIDConfig,
  removeCancelRequestByIDConfig,
} from "lib";
import {
  getProductsDispatch,
  setProductsLoading,
  getProductsPaginationProps,
  getProductDispatch,
} from "store/Slices/productsSlice";
import { getDataCounts } from "./count";

// Get All Products
export const getProducts = () => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, defaultData, config } = getProductsConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getProductsDispatch(res?.data?.data));
      const paginationProps = {
        currentPage: res?.data?.currentPage,
        pageSize: res?.data?.pageSize,
        totalCount: res?.data?.totalCount,
        totalPages: res?.data?.totalPages,
      }
      dispatch(getProductsPaginationProps(paginationProps))
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

//Search Products
export const getSearchProducts = (data) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = getProductsConfig();
      const res = await axios.post(url, data, config);
      dispatch(getProductsDispatch(res?.data?.data));
      const paginationProps = {
        currentPage: res?.data?.currentPage,
        pageSize: res?.data?.pageSize,
        totalCount: res?.data?.totalCount,
        totalPages: res?.data?.totalPages,
      }
      dispatch(getProductsPaginationProps(paginationProps))
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setProductsLoading(false));
    }
  }
}

// Get filtered Products
export const getFilteredProducts = (status, data) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = getFilteredProductsConfig(status);
      const res = await axios.post(url, data, config);
      dispatch(getProductsDispatch(res?.data?.data));
      const paginationProps = {
        currentPage: res?.data?.currentPage,
        pageSize: res?.data?.pageSize,
        totalCount: res?.data?.totalCount,
        totalPages: res?.data?.totalPages,
      }
      dispatch(getProductsPaginationProps(paginationProps))
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

//Get Product By ID
export const getProductById = (id, navigate, setActive) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    navigate(
      `/client/dashboard/products/list/overview/${id}`
    );
    setActive && setActive("OVERVIEW")
    try {
      const { url, config } = getProductsByIDConfig(id);
      const res = await axios.get(url, config);
      if (res.status === 200) {
        if (res?.data?.data) {
          dispatch(getProductDispatch(res?.data?.data));
        }
      }
    } catch (error) {
      toast.error("No Data For This Product");
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

//Cancel Id Immediately
export const cancelRequestImmediately = (id) => {
  return async (dispatch, getState) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = cancelProductByIDConfig(id);
      const res = await axios.put(url, id, config);
      if (res.status === 200) {
        const { url, config } = getProductsByIDConfig(id);
        const res = await axios.get(url, config);
        dispatch(getProductDispatch(res?.data?.data));
        dispatch(getDataCounts());
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

//Cancel Id At The End Of The billing period
export const cancelRequestAtTheEnd = (id) => {
  return async (dispatch, getState) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = cancelProductAtEndByIDConfig(id);
      const res = await axios.put(url, id, config);
      if (res.status === 200) {
        const { url, config } = getProductsByIDConfig(id);
        const res = await axios.get(url, config);
        dispatch(getProductDispatch(res?.data?.data));
        dispatch(getDataCounts());
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

//Remove Cancel Request
export const removeCancelRequest = (id) => {
  return async (dispatch, getState) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = removeCancelRequestByIDConfig(id);
      const res = await axios.put(url, id, config);
      if (res.status === 200) {
        const { url, config } = getProductsByIDConfig(id);
        const res = await axios.get(url, config);
        dispatch(getProductDispatch(res?.data?.data));
        dispatch(getDataCounts());
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};