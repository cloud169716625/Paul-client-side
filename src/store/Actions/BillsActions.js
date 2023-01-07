import { axios, getError } from "lib";
import { toast } from "react-toastify";
import {
  getBillingsConfig,
  getTransactionsConfig,
  payAllInvoicesConfig,
  getUnpaidInvoiceCountConfig,
  getCurrentCreditBalanceConfig
} from "lib/requests";
import {
  getBillsDispatch,
  getTransactionsDispatch,
  getUnpaidInvoiceCountDispatch,
  getCurrentCreditBalanceDispatch,
  setBillsLoading,
} from "store/Slices";

export const getBills = () => {
  return async (dispatch) => {
    dispatch(setBillsLoading(true));
    try {
      const { url } = getBillingsConfig();
      const res = await axios.get(url);
      if (res.status === 200) {
        dispatch(getBillsDispatch(res?.data?.data));
      }
      dispatch(setBillsLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setBillsLoading(false));
    }
  };
};

export const getTransactions = () => {
  return async (dispatch) => {
    dispatch(setBillsLoading(true));
    try {
      const { url, data, config } = getTransactionsConfig();
      const res = await axios.post(url, data, config);
      if (res.status === 200) {
        dispatch(getTransactionsDispatch(res?.data?.data));
      }
      dispatch(setBillsLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setBillsLoading(false));
    }
  };
};

export const getUnpaidInvoiceCount = (clientId) => {
  return async (dispatch) => {
    try {
      const { url, config } = getUnpaidInvoiceCountConfig(clientId);
      const res = await axios.get(url, config);
      if (res.status === 200) {
        dispatch(getUnpaidInvoiceCountDispatch(res?.data?.data));
      }
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

export const getCurrentCreditBalance = () => {
  return async (dispatch) => {
    try {
      const { url, config } = getCurrentCreditBalanceConfig();
      const res = await axios.get(url, config);
      if (res.status === 200) {
        dispatch(getCurrentCreditBalanceDispatch(res?.data?.data));
      }
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

export const payAllInvoices = ({ data, onSuccess, onFail }) => {
  return async (dispatch) => {
    dispatch(setBillsLoading(true));
    try {
      const { url, config } = payAllInvoicesConfig();
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        dispatch(getBills());
        onSuccess && onSuccess();
      } else {
        onFail && onFail();
      }
    } catch (e) {
      toast.error(getError(e));
      dispatch(setBillsLoading(false));
      onFail && onFail();
    }
  };
};
