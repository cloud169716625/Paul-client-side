import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bills: [],
  transactions: [],
  bill: null,
  loading: false,
  unpaidInvoiceCount: 0,
  currentCreditBalance: 0,
};
const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    getBills: (state, { payload }) => {
      state.bills = payload;
    },
    getBill: (state, { payload }) => {
      state.bill = payload;
    },
    setBillsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
    getUnpaidInvoiceCount: (state, { payload }) => {
      state.unpaidInvoiceCount = payload ?? 0;
    },
    getCurrentCreditBalance: (state, { payload }) => {
      state.currentCreditBalance = payload ?? 0;
    }
  },
});

const { reducer, actions } = billsSlice;
export const {
  getBill,
  getBills,
  setBillsLoading,
  getTransactions,
  getUnpaidInvoiceCount,
  getCurrentCreditBalance,
} = actions;

export default reducer;
