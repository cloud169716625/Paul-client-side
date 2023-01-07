// MFA Auth Endpoints
export const validateMFAConfig = () => ({
  url: '/api/mfauthenticator/validate-mfa',
});
export const validateOTPConfig = () => ({
  url: '/api/mfauthenticator/validate-otp-2fa',
});
// Reset Authenticator
export const resetauthenticator = () => ({
  url: '/api/mfauthenticator/reset-authenticator',
});
// Enable-Disable MFA
export const enableDisable2FAConfig = () => ({
  url: '/api/mfauthenticator/enable-disable-2fa',
});
// Check MFA Status
export const getCurrentMFAStatus = () => ({
  url: `/api/mfauthenticator/getcurrentstatusoftwofactorauthentication`,
});
// Send OTP to Email
export const sendOTPToEmailConfig = () => ({
  url: '/api/mfauthenticator/generateotpemail',
});
