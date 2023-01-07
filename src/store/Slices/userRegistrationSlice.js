import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  status: '',
  message: null,
};
const userRegistrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    UserRegistrationPending: (state) => {
      state.isLoading = true;
    },
    UserRegistrationSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload;
    },
    UserRegistrationFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload;
    },
  },
});

const { reducer, actions } = userRegistrationSlice;

export const {
  UserRegistrationPending,
  UserRegistrationSuccess,
  UserRegistrationFail,
} = actions;
export default reducer;
