const { REACT_APP_AUTH_KEY_ID, REACT_APP_PROFILE_ID } = process.env;

export const defaultTenant = "client";
export const AuthTokenKey = REACT_APP_AUTH_KEY_ID || "AuthToken__client";
export const ProfileKey = REACT_APP_PROFILE_ID || "CurrentUser__client";
