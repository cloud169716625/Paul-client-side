import {
  getError,
  axios,
  getDepartmentsConfig,
  addDepartmentConfig,
  editDepartmentConfig,
  deleteDepartmentConfig,
  getDepartmentsByUserIdConfig,
  getUsersByDepartmentIdConfig,
  assignDepartmentConfig,
  unAssignDepartmentConfig,
} from "lib";

import { toast } from "react-toastify";
import {
  getDepartments as getDepartmentsDispatch,
  setDepartmentsLoading,
  getUsersDepartmentsDispatch,
  getDepartmentUsersDispatch,
  setDepartmentsUsersLoading,
} from "store/Slices/departmentsSlice";

// Get All Departments
export const getDepartments = (isInterval) => {
  return async (dispatch) => {
    !isInterval && dispatch(setDepartmentsLoading(true));
    try {
      const { url, defaultData, config } = getDepartmentsConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getDepartmentsDispatch(res?.data?.data));
      !isInterval && dispatch(setDepartmentsLoading(false));
    } catch (e) {
      toast.error(getError(e));
      !isInterval && dispatch(setDepartmentsLoading(false));
    }
  };
};

// Get Departments By User ID
export const getDepartmentsByUserId = ({ id }) => {
  return async (dispatch) => {
    dispatch(setDepartmentsLoading(true));
    try {
      const { url, config } = getDepartmentsByUserIdConfig({ id });
      const res = await axios.get(url, config);
      dispatch(getUsersDepartmentsDispatch(res?.data?.data));
      dispatch(setDepartmentsLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setDepartmentsLoading(false));
    }
  };
};

// Get Departments By User ID
export const getUsersByDepartmentID = ({ id }) => {
  return async (dispatch) => {
    if (id) {
      dispatch(setDepartmentsUsersLoading(true));
      try {
        const { url, config } = getUsersByDepartmentIdConfig(id);
        const res = await axios.get(url, config);
        dispatch(getDepartmentUsersDispatch(res?.data?.data));
        dispatch(setDepartmentsUsersLoading(false));
      } catch (e) {
        toast.error(getError(e));
        dispatch(setDepartmentsUsersLoading(false));
      }
    }
  };
};

// Assign Department to Admin By ID
export const assignDepartmentByUserId = ({ data }) => {
  return async (dispatch) => {
    dispatch(setDepartmentsLoading(true));
    try {
      const { url, config } = assignDepartmentConfig();
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        const { url, config } = getDepartmentsByUserIdConfig({
          id: data?.userId,
        });
        const res = await axios.get(url, config);
        dispatch(getUsersDepartmentsDispatch(res?.data?.data));
      }
      dispatch(setDepartmentsLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setDepartmentsLoading(false));
    }
  };
};

// Un-Assign Department from Admin By ID
export const unAssignDepartmentByUserId = ({ data }) => {
  return async (dispatch) => {
    if (data) {
      dispatch(setDepartmentsLoading(true));
      try {
        const { url, config } = unAssignDepartmentConfig();
        const res = await axios.post(url, data, config);
        if (res?.status === 200) {
          const { url, config } = getDepartmentsByUserIdConfig({
            id: data?.userId,
          });
          const res = await axios.get(url, config);
          dispatch(getUsersDepartmentsDispatch(res?.data?.data));
        }
        dispatch(setDepartmentsLoading(false));
      } catch (e) {
        toast.error(getError(e));
        dispatch(setDepartmentsLoading(false));
      }
    }
  };
};

// Add Department
export const addDepartment = (data) => {
  return async (dispatch) => {
    dispatch(setDepartmentsLoading(true));
    try {
      const { url, config } = addDepartmentConfig();
      const res = await axios.post(url, data, config);
      if (res.status === 200) {
        const { url, defaultData, config } = getDepartmentsConfig();
        const response = await axios.post(url, defaultData, config);
        dispatch(getDepartmentsDispatch(response?.data?.data));
        toast.success("Departments Added Successfully");
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setDepartmentsLoading(false));
    }
  };
};

export const editDepartment = ({ data }) => {
  return async (dispatch) => {
    dispatch(setDepartmentsLoading(true));
    try {
      const { url, config } = editDepartmentConfig({ id: data?.id });
      const response = await axios.put(url, data, config);
      if (response.status === 200) {
        const { url, defaultData, config } = getDepartmentsConfig();
        const response = await axios.post(url, defaultData, config);
        dispatch(getDepartmentsDispatch(response?.data?.data));
        toast.success("Departments Updated Successfully");
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setDepartmentsLoading(false));
    }
  };
};

export const deleteDepartment = ({ id }) => {
  return async (dispatch) => {
    dispatch(setDepartmentsLoading(true));
    try {
      const { url, config } = deleteDepartmentConfig({ id });
      const response = await axios.delete(url, config);
      if (response.status === 200) {
        const { url, defaultData, config } = getDepartmentsConfig();
        const response = await axios.post(url, defaultData, config);
        dispatch(getDepartmentsDispatch(response?.data?.data));
        toast.success("Departments Deleted Successfully");
      }
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setDepartmentsLoading(false));
    }
  };
};
