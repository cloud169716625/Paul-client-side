import { axios, enableDisable2FAConfig } from 'lib';

// MFA Calls
export const enableDisable2FA = async ({ userId, flag }) => {
  const res = await axios.post(enableDisable2FAConfig().url, {
    userId,
    flag,
  });
  return res;
};
