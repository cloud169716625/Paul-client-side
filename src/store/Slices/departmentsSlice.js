import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  userDepartments: [],
  departmentUsers: [],
  loading: false,
  usersLoading: false,
};
const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    getDepartments: (state, { payload }) => {
      state.departments = payload;
    },
    setDepartmentsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setDepartmentsUsersLoading: (state, { payload }) => {
      state.usersLoading = payload;
    },
    getUsersDepartmentsDispatch: (state, { payload }) => {
      state.userDepartments = payload;
    },
    getDepartmentUsersDispatch: (state, { payload }) => {
      state.departmentUsers = payload;
    },
  },
});

const { reducer, actions } = departmentsSlice;
export const {
  getDepartments,
  setDepartmentsLoading,
  getUsersDepartmentsDispatch,
  getDepartmentUsersDispatch,
  setDepartmentsUsersLoading,
} = actions;

export default reducer;
