import {
  getError,
  axios,
  getUserConfig,
  getUsersConfig,
  updateUserModule,
  addUserModule,
  getUserModulesConfig,
  getUserAppSettingsConfig,
  getSubUsersConfig,
  getOnlineUsersConfig,
  updateUserAppSettings,
  addUserAppSettings,
  updateUserPasswordConfig,
  updateUserProfileByIDConfig,
  getClientsConfig,
  updateAutoBillStateConfig,
} from "lib";
import { defaultTenant } from "lib/constants";
import { toast } from "react-toastify";
import {
  getClientsDispatch,
  getOnlineUsers,
  getUser,
  getUserModule,
  setUserLoading,
  getUsersDispatch,
} from "store/Slices";
import { updatedAuthUserData } from "store/Slices/authSlice";
import { getSubusersFail, getSubusersPending, getSubusersSuccess, getUserSettingsSlice } from "store/Slices/usersSlice";

// Get All Admin Users
export const getUsers = () => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = getUsersConfig();
      const res = await axios.get(url, config);
      dispatch(getUsersDispatch(res?.data?.data));
      dispatch(setUserLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    }
  };
};

// Get Online Users
export const getCurrentOnlineUsers = (isInterval) => {
  return async (dispatch) => {
    !isInterval && dispatch(setUserLoading(true));
    try {
      const { url, config } = getOnlineUsersConfig();
      const res = await axios.get(url, config);
      !isInterval && dispatch(getOnlineUsers(res?.data));
      if (isInterval && res?.data?.length > 0) {
        dispatch(getOnlineUsers(res?.data));
      }
      isInterval && dispatch(setUserLoading(false));
    } catch (e) {
      !isInterval && toast.error(getError(e));
      !isInterval && dispatch(setUserLoading(false));
    }
  };
};


// Get User By ID
export const getUserById = (id, isClient = false) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = getUserConfig(id, isClient);
      const res = await axios.get(url, config);
      dispatch(getUser(res?.data?.data));
      dispatch(setUserLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    }
  };
};

// Update User
export const updateUserPassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch(setUserLoading(true));
      const { url, config } = updateUserPasswordConfig();
      await axios.post(url, data, config);
      toast.success("User Password Successfully");
    } catch (e) {
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    } finally {
      dispatch(setUserLoading(false));
    }
  };
};

// Get User Modules By ID
export const getUserModulesById = (id) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = getUserModulesConfig(id);
      const res = await axios.get(url, config);
      dispatch(getUserModule(res?.data?.data));
      dispatch(setUserLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    }
  };
};

// Edit Permissions of a group (gid = GroupID)
export const editUserPermissions = ({ permission, uid }) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      if (permission?.id) {
        const { url, config } = updateUserModule(permission?.id);
        const updateObj = {
          name: permission?.name,
          permissionDetail: JSON.stringify(permission?.permissionDetail),
          tenant: defaultTenant,
          isActive: true,
          adminGroupId: permission?.adminGroupId,
        };
        await axios.put(url, updateObj, config);
      } else {
        const { url, config } = addUserModule();
        const createObj = {
          name: permission?.name,
          permissionDetail: JSON.stringify(permission?.permissionDetail),
          tenant: defaultTenant,
          isActive: true,
          userId: uid,
        };
        await axios.post(url, createObj, config);
      }
      dispatch(setUserLoading(false));
    } catch (e) {
      toast.error(getError(e));
      dispatch(setUserLoading(false));
    }
  };
};

// Get User Settings By ID
export const getUserSettingsById = (id) => {
  return async (dispatch) => {
    try {
      const { url, config } = getUserAppSettingsConfig(id);
      const res = await axios.get(url, config);
      dispatch(getUserSettingsSlice(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

// Update User Settings By ID
export const updateUserSettings = ({ data }) => {
  return async (dispatch) => {
    try {
      let res;
      if (data?.id) {
        const { url, config } = updateUserAppSettings({ id: data?.id });
        res = await axios.put(url, data, config);
      } else {
        const { url, config } = addUserAppSettings();
        res = await axios.post(url, data, config);
      }
      if (res.status === 200) {
        const { url, config } = getUserAppSettingsConfig(data?.userId);
        const res = await axios.get(url, config);
        dispatch(getUserSettingsSlice(res?.data?.data));
        toast.success("User Settings Updated Successfully");
      }
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

// Update User AutoBill state By ID
export const updateAutoBillState = ({ id, state })=>{
  return async () => {
    try {
      const { url, config } = updateAutoBillStateConfig(id);
      const data = { autoBill:state }
      await axios.put(url, data, config);
      toast("Success updating autobill state");
    } catch (e) {
      toast.error(getError(e));
    }
  }
  
}

// Update User
export const updateUser = (id, data, isClient = false) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url, config } = updateUserProfileByIDConfig(id, isClient);
      const res = await axios.put(url, data, config);
      // If Updated Then Get User
      if (res.status === 200) {
        const res = await axios.get(url);
        dispatch(updatedAuthUserData(res?.data?.data));

        toast.success("Profile Updated Successfully");
      }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setUserLoading(false));
    }
  };
};

// Get User Modules By ID
export const getSubUsersById = (userId) => {
  return async (dispatch) => {
    dispatch(getSubusersPending());
    try {
      const { url, config } = getSubUsersConfig(userId);
      const res = await axios.get(url, config);
      dispatch(getSubusersSuccess(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
      dispatch(getSubusersFail());
    }
  };
};

// Get All Client Users
export const getClients = (isInterval) => {
  return async (dispatch) => {
    !isInterval && dispatch(setUserLoading(true));
    try {
      const { url, config } = getClientsConfig();
      const res = await axios.get(url, config);
      dispatch(getClientsDispatch(res?.data?.data));
      !isInterval && dispatch(setUserLoading(false));
    } catch (e) {
      toast.error(getError(e));
      !isInterval && dispatch(setUserLoading(false));
    }
  };
};
