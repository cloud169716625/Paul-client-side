import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ticketComments: [],
    commentLoading: false
};

const ticketCommentsSlice = createSlice({
    name: "ticketComments",
    initialState,
    reducers: {
        getTicketComments: (state, { payload }) => {
            state.ticketComments = payload;
        },
        setTicketCommentLoading: (state, { payload }) => {
            state.commentLoading = payload;
        },

    }
})

const { reducer, actions } = ticketCommentsSlice;
export const { getTicketComments, setTicketCommentLoading } = actions;

export default reducer;