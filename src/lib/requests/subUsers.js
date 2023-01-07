import { getConfig } from './getConfig';

const getSubUserConfig = (action) =>
  getConfig({ module: 'SubUsers', action });

// Get subUsers List
export const getSubUsersConfig = () => ({
    url: `/api/subusers/get-all-subusers`,
    config: getSubUserConfig('View')
});
// Get subUser by id
export const getSubUserByIDConfig = (id) => ({
    url: `/api/subusers/id?id=${id}`,
    config: getSubUserConfig('View')
})
// Activate subUser by id
export const activateSubUserByIDConfig = (id) => ({
    url: `/api/subusers/${id}/activate`,
    config: getSubUserConfig('Update')
})
// DeActivate subUser by id
export const deactivateSubUserByIDConfig = (id) => ({
    url: `/api/subusers/${id}/deactivate`,
    config: getSubUserConfig('Update')
})
// Add subUsers
export const addSubUsersConfig = () => ({
    url: `/api/subusers/add-new-subuser`,
    config: getSubUserConfig('Create')
});
// Delete subUsers
export const deleteSubUsersConfig = (id) => ({
    url: `/api/subusers/${id}/delete`,
    config: getSubUserConfig('Delete')
});
// Update subUser
export const updateSubUserConfig = (id) => ({
    url: `/api/subusers/update-subuser/${id}`,
    config: getSubUserConfig('Update')
});
// Update subUser permission
export const updateSubUserPermissionsConfig = () => ({
    url: `/api/subusers/subusermodulelist`,
    config: getSubUserConfig('Update')
});