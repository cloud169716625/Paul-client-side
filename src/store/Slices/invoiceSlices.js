import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoice:null,
    invoices:[],
    loading:false
  };

  const invoiceSlice = createSlice ({
  name:"invoice",
  initialState,
  reducers: {
    getInvoiceByIdDispatch: (state, { payload }) => {
        state.invoice = payload;
      },
      setInvoiceLoading: (state, { payload }) => {
        state.loading = payload;
    },
    getInvoiceDispatch: (state, { payload }) => {
        state.invoices = payload;
      },
  },
  });

  const { reducer, actions } = invoiceSlice;
  export const {
    getInvoiceByIdDispatch,
    getInvoiceDispatch,
    setInvoiceLoading } = actions
      
export default reducer;