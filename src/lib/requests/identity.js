import { getConfig } from "lib";

// Identity End-Points
const Identity = "Identity";
const Clients = "Clients";
const identityConfig = (action) => getConfig({ module: Identity, action });
const clientConfig = (action) => getConfig({ module: Clients, action });
export const getProfile = () => ({
  url: `/api/identity/profile`,
  config: identityConfig('View'),
});
export const updateUserProfileConfig = () => ({
  url: `/api/identity/profile`,
});
export const changePasswordConfig = () => ({
  url: `/api/identity/change-password`,
});
export const updateEmailConfig = () => ({
  url: `/api/identity/updateemail`,
  config: identityConfig('View'),
});
export const registerAdminConfig = () => ({
  url: "/api/identity/register-admin",
  config: identityConfig('Create'),
});
export const registerClientConfig = () => ({
  url: "/api/identity/register-client-user",
  config: clientConfig('Create'),
});
export const updateUserProfileByIDConfig = (id, isClient) => ({
  url: `/api/identity/profile/${id}`,
  config: isClient ? clientConfig('Update') : identityConfig('Update'),
});
export const updateUserPasswordConfig = () => ({
  url: `/api/identity/change-password-other`,
});
export const getUserProfileByIDConfig = (id, isClient) => ({
  url: `/api/identity/profile/${id}`,
  config: isClient ? clientConfig('View') : identityConfig('View'),
});
