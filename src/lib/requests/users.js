import { getConfig } from "lib";
const AdminUsers = "AdminUsers";
const Clients = "Clients";
const adminConfig = (action) => getConfig({ module: AdminUsers, action });
const clientConfig = (action) => getConfig({ module: Clients, action });

// Users
export const getUsersConfig = () => ({
  url: `/api/users/getallusersbyrolename/admin`,
  config: adminConfig('View'),
});

export const getOnlineUsersConfig = () => ({
  url: `/api/users/getallonlineuser`,
  config: getConfig({ module: 'Identity', action: 'Search' }),
});

export const getUserConfig = (id, isClient) => ({
  url: `/api/identity/profile/${id}`,
  config: isClient ? clientConfig('View') : adminConfig('View'),
});
export const getClientsConfig = () => ({
  url: `/api/users/getallusersbyrolename/client`,
  config: getConfig({ module: 'Articles', action: 'Search' }),
});
export const getSpecificConfig = () => ({
  url: `/api/users/find/specific`,
});
export const deleteClientConfig = (id) => ({
  url: `/api/users/${id}/delete`,
});
export const deactivateClientConfig = (id, type) => ({
  url: `/api/users/${id}/${type}`,
});
