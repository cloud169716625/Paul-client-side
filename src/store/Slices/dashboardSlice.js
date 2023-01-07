import { createSlice } from "@reduxjs/toolkit";
import { boolean } from "yup";

const initialState = {
    ticketLists:[],
    notificationLists:[],
    ticketStatistics:{},
    productSvcStatistics:{},
    invoiceStatistics:{}, 
}

const dashboardSlice = createSlice({
    name:'dashboard',
    initialState,
    reducers:{
        getMultiData : (state, {payload}) => {
            state.ticketLists = payload.ticketItems;
            state.ticketStatistics = payload.ticketStatistics;
            state.productSvcStatistics = payload.productServiceStatistics;
            state.invoiceStatistics = payload.invoiceStatistics;
        },
        getNotificationLists: (state, {payload}) => {
            state.notificationLists = payload;
        }
    }
})

const {reducer, actions} = dashboardSlice;

export const { getMultiData, getNotificationLists, getBillState, setBillState} = actions;

export default reducer;

