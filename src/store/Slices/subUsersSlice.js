import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subUsers: [],
    subUser: null,
    loading: false,
};
const subUsersSlice = createSlice({
    name: 'subUsers',
    initialState,
    reducers: {
        getSubUsers: (state, { payload }) => {
            state.subUsers = payload;
        },
        getSubUser: (state, { payload }) => {
          state.subUser = payload;
        },
        setSubUsersLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});

const { reducer, actions } = subUsersSlice;

export const { getSubUsers, getSubUser, setSubUsersLoading } = actions;
export default reducer;
