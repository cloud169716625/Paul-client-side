import { toast } from "react-toastify";
import { axios } from "lib";
import { getError } from "lib";
import {
  getInvoiceByIdConfig,
  getInvoiceHistoryConfig
} from "lib/requests/invoice";

import {
  getInvoiceDispatch,
  getInvoiceByIdDispatch,
  setInvoiceLoading
} from "store/Slices/invoiceSlices";

// Get ALL Invoice History Table
export const getAllInvoiceHistory = () => {
  return async (dispatch) => {
    dispatch(setInvoiceLoading(true));
    try {
      const { url, config } = getInvoiceHistoryConfig();
      const res = await axios.get(url, config);
      dispatch(getInvoiceDispatch(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setInvoiceLoading(false));
    }
  };
};

// get Invoice By Id
export const getInvoiceByID = (id) => {
  return async (dispatch) => {
    dispatch(setInvoiceLoading(true));
    try {
      const { url, config } = getInvoiceByIdConfig(id);
      const res = await axios.get(url, config);
      dispatch(getInvoiceByIdDispatch(res?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setInvoiceLoading(false));
    }
  };
};