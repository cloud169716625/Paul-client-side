import {
    axios,
    getError,
    getSubUsersConfig,
    addSubUsersConfig,
    deleteSubUsersConfig,
    getSubUserByIDConfig,
    activateSubUserByIDConfig,
    deactivateSubUserByIDConfig,
    updateSubUserConfig,
    updateSubUserPermissionsConfig,
} from 'lib';
import { toast } from 'react-toastify';
import { getSubUsers, getSubUser, setSubUsersLoading } from 'store/Slices';

// Get ALL subUsers
export const getAllSubUsers = () => {
    return async (dispatch) => {
        dispatch(setSubUsersLoading(true));
        try {
            const { url, config } = getSubUsersConfig();
            const res = await axios.get(url, config);
            dispatch(getSubUsers(res?.data?.data));
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setSubUsersLoading(false));
        }
    };
};
// Get subUsers by ID
export const getSubUserByID = (id) => {
    return async (dispatch) => {
        dispatch(setSubUsersLoading(true));
        try {
            const { url, config } = getSubUserByIDConfig(id);
            const res = await axios.get(url, config);
            dispatch(getSubUser(res?.data?.data));
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setSubUsersLoading(false));
        }
    };
};
// Activate subUser by ID
export const activateSubUserByID = (id) => {
    return async (dispatch, getState) => {
        dispatch(setSubUsersLoading(true));
        try {
            const { url, config } = activateSubUserByIDConfig(id);
            const res = await axios.put(url, config);
            if (res.status === 200) {
                const { subUsers } = getState().subUsers;
                const index = subUsers.findIndex((key) => key.id === id)
                const subUserStatusUpdate = [...subUsers]
                let fullName =  "";
                if (index >= 0) {
                    fullName = subUserStatusUpdate[index]?.fullName
                    subUserStatusUpdate[index] = {
                        ...subUserStatusUpdate[index],
                        ['isActive']: true
                    }
                }
                dispatch(getSubUsers(subUserStatusUpdate));
                toast.success(`${fullName ? fullName : "Sub-User"} Activated Successfully`);
            }
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setSubUsersLoading(false));
        }
    };
};
// Deactivate subUser by ID
export const deactivateSubUserByID = (id) => {
    return async (dispatch, getState) => {
        dispatch(setSubUsersLoading(true));
        try {
            const { url, config } = deactivateSubUserByIDConfig(id);
            const res = await axios.put(url, config);
            if (res.status === 200) {
                const { subUsers } = getState().subUsers;
                const index = subUsers.findIndex((key) => key.id === id)
                const subUserStatusUpdate = [...subUsers]
                let fullName =  "";
                if (index >= 0) {
                    fullName = subUserStatusUpdate[index]?.fullName
                    subUserStatusUpdate[index] = {
                        ...subUserStatusUpdate[index],
                        ['isActive']: false
                    }
                }
                dispatch(getSubUsers(subUserStatusUpdate));
                toast.success(`${fullName ? fullName : "Sub-User"} Deactivated Successfully`);
            }
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setSubUsersLoading(false));
        }
    };
};
// Add a new subUsers
export const addSubUsers = (data) => {
    return async (dispatch) => {
        dispatch(setSubUsersLoading(true));
        try {
            const { url, config } = addSubUsersConfig();
            const res = await axios.post(url, data, config);
            if (res.status === 200) {
                const { url, defaultData, config } = getSubUsersConfig();
                const res = await axios.get(url, defaultData, config);
                dispatch(getSubUsers(res?.data?.data));
                toast.success('Sub-User Added Successfully');
            }
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setSubUsersLoading(false));
        }
    };
};
// Delete subUsers
export const deleteSubUser = (id) => {
    return async (dispatch, getState) => {
        dispatch(setSubUsersLoading(true));
        try {
            const { url, config } = deleteSubUsersConfig(id);
            const res = await axios.delete(url, config);
            if (res.status === 200) {
                const { url, defaultData, config } = getSubUsersConfig();
                const res = await axios.get(url, defaultData, config);
                dispatch(getSubUsers(res?.data?.data));
                toast.success('Sub-User Deleted Successfully');
            }
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setSubUsersLoading(false));
        }
    };
};
// Update subUser
export const updateSubUser = (id, data) => {
    return async (dispatch) => {
        dispatch(setSubUsersLoading(true));
        try {
            const { url, config } = updateSubUserConfig(id);
            const res = await axios.post(url, data, config);
            if (res.status === 200) {
                const { url, defaultData, config } = getSubUsersConfig();
                const res = await axios.get(url, defaultData, config);
                dispatch(getSubUsers(res?.data?.data));
                toast.success('Sub-User Updated Successfully');
            }
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setSubUsersLoading(false));
        }
    };
};
// Update subUser Permissions
export const updateSubUserPermissions = (data) => {
    return async (dispatch) => {
        dispatch(setSubUsersLoading(true));
        try {
            const { url, config } = updateSubUserPermissionsConfig();
            const res = await axios.put(url, data, config);
            if (res.status === 200) {
                const { url, defaultData, config } = getSubUsersConfig();
                const res = await axios.get(url, defaultData, config);
                dispatch(getSubUsers(res?.data?.data));
                toast.success('Sub-User Permissions Updated Successfully');
            }
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setSubUsersLoading(false));
        }
    };
};