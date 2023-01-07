import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ticketReplies: [],
    repliesLoading: false
};

const ticketRepliesSlice = createSlice({
    name: "ticketReplies",
    initialState,
    reducers: {
        getTicketReplies: (state, { payload }) => {
            state.ticketReplies = payload;
        },
        setTicketRepliesLoading: (state, { payload }) => {
            state.repliesLoading = payload;
        },

    }
})

const { reducer, actions } = ticketRepliesSlice;
export const { getTicketReplies, setTicketRepliesLoading } = actions;

export default reducer;