import { toast } from "react-toastify";
import {
  getError,
  axios,
  getProfile,
  changePasswordConfig,
  updateEmailConfig,
} from "lib";
import { defaultTenant } from "../../lib/constants";
import {
  authenticationFail,
  authenticationPending,
  authenticationSuccess,
  autoAuthenticationSuccess,
  confirmOtpFail,
  confirmOtpPending,
  confirmOtpSuccess,
  fetchAuthentorUriFail,
  fetchAuthentorUriPending,
  fetchAuthentorUriSuccess,
  forgotPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  initAuthenticationFail,
  initAuthenticationPending,
  initAuthenticationSuccess,
  logout,
  resetPasswordFail,
  resetPasswordPending,
  resetPasswordSuccess,
  verificationFail,
  verificationPending,
  verificationSuccess,
} from "store/Slices/authSlice";
import { getBrand } from "store/Actions/BrandActions";
import {
  checkMaintenanceFail,
  checkMaintenancePending,
  checkMaintenanceSuccess,
  fetchSettingsFail,
  fetchSettingsPending,
  fetchSettingsSuccess,
} from "store/Slices/settingSlice";
import {
  UserRegistrationFail,
  UserRegistrationPending,
  UserRegistrationSuccess,
} from "store/Slices/userRegistrationSlice";
import { AuthTokenKey } from "../../lib/constants";
import { getCurrentTokenState } from "lib/axios-interceptors";

// Update Email
export const updateEmail = (data) => async (dispatch) => {
  dispatch(initAuthenticationPending());
  try {
    const { url, config } = updateEmailConfig();
    await axios.put(url, data, config);
    const profileConfig = getProfile();
    const profileRes = await axios.get(profileConfig?.url, config);
    dispatch(
      authenticationSuccess({
        user: profileRes?.data?.data,
      })
    );
    toast.success("Email updated successfully");
  } catch (error) {
    toast.error("Email update failed");
  }
};
// Change Password
export const changePassword = (values) => {
  return async function (dispatch) {
    dispatch(initAuthenticationPending());
    try {
      const { url, config } = changePasswordConfig();
      await axios.post(url, values, config);
      dispatch(logout());
      toast.success(
        "Password changed successfully, Please login again using new password"
      );
    } catch (e) {
      toast.error(getError(e));
    }
  };
};

export const getUserProfile = (token) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const { config } = getProfile();
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/profile`,
      {
        method: "GET",
        headers: new Headers({
          ...config.headers,
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
          Authorization: `Bearer ${token}`,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(authenticationFail(error));
    }
    const res = await response.json();
    dispatch(
      authenticationSuccess({
        user: res.data,
      })
    );

    // Update brandId
    if (res.data.brandId) {
      dispatch(getBrand(res.data.brandId));
    }

    localStorage.setItem("CurrentUser__client", JSON.stringify(res.data));
  };
};

export const SaveTokenInLocalStorage = (dispatch, TokenDetails) => {
  // logOutTimer(dispatch, TokenDetails.refreshTokenExpiryTime);
  localStorage.setItem(AuthTokenKey, JSON.stringify(TokenDetails));
};

export const loginbyOtp = (email, otpCode) => {
  return async (dispatch) => {
    dispatch(initAuthenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/tokens/gettokenbyotp`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          otpCode,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(initAuthenticationFail(error));
    }
    const res = await response.json();
    dispatch(initAuthenticationSuccess(res.data));
    dispatch(getUserProfile(res.data.token));
    SaveTokenInLocalStorage(dispatch, res.data);
  };
};

export const signup = (
  FullName,
  userName,
  email,
  password,
  confirmPassword,
  companyName,
  address1,
  address2,
  city,
  state_Region,
  zipCode,
  country,
  brandId,
  IpAddress,
  parentID
) => {
  return async (dispatch) => {
    dispatch(UserRegistrationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/register-client-user`,
      {
        method: "POST",
        body: JSON.stringify({
          FullName,
          userName,
          email,
          password,
          confirmPassword,
          companyName,
          address1,
          address2,
          city,
          state_Region,
          zipCode,
          country,
          brandId,
          IpAddress,
          parentID,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      let message = "";
      if (error.message === "Email already in use") {
        message = "Account with the same email already exits";
      } else {
        message =
          "Failed to create account, Please check your connection and try again";
      }
      dispatch(UserRegistrationFail(message));
    }
    const data = await response.json();
    dispatch(UserRegistrationSuccess(data));
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch(forgotPasswordPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/forgot-password`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(forgotPasswordFail(error));
    }
    const data = await response.json();
    dispatch(forgotPasswordSuccess(data));
  };
};

export const passwordReset = (email, password, confirmPassword, token) => {
  return async (dispatch) => {
    dispatch(resetPasswordPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/identity/reset-password`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          token,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          tenant: defaultTenant,
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(resetPasswordFail(error));
    }
    const data = await response.json();
    dispatch(resetPasswordSuccess(data));
  };
};

export const validateEmailToken = (userId, code) => {
  return async (dispatch) => {
    dispatch(verificationPending());
    const response = await fetch(
      `${
        process.env.REACT_APP_BASEURL
      }/api/identity/confirm-email?userId=${userId}&code=${code.trim()}&tenant=admin`,
      {
        method: "GET",
        headers: new Headers({
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(verificationFail(error));
    }
    const data = await response.json();
    dispatch(verificationSuccess(data));
  };
};

export const maintenanceStatus = () => {
  return async (dispatch) => {
    dispatch(checkMaintenancePending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/maintenance/maintenancemode/admin`,
      {
        method: "GET",
        headers: new Headers({
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(checkMaintenanceFail(error));
      return;
    }

    const res = await response.json();
    dispatch(checkMaintenanceSuccess(res));
  };
};

export const trustedDays = () => {
  return async (dispatch) => {
    dispatch(fetchSettingsPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/v1/client/settings/getsettingswithtenant/client`,
      {
        method: "GET",
        headers: new Headers({
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(fetchSettingsFail(error));
    }

    const res = await response.json();
    dispatch(fetchSettingsSuccess(res.data));
  };
};

export const confirmOtp = (userId, otp) => {
  return async (dispatch) => {
    dispatch(confirmOtpPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/validate-mfa`,
      {
        method: "POST",
        body: JSON.stringify({
          userId,
          otp,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(confirmOtpFail(error));
    }

    const res = await response.json();
    dispatch(confirmOtpSuccess(res));
    const userEmail = localStorage.getItem("userEmail__client");
    dispatch(loginbyOtp(userEmail, otp));
  };
};

export const disableConfirmOtp = (userId, otp, isRemember, days) => {
  return async (dispatch) => {
    dispatch(confirmOtpPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/removetwofactorauthentication`,
      {
        method: "POST",
        body: JSON.stringify({
          userId,
          otp,
          isRemember,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(confirmOtpFail(error));
    }

    const res = await response.json();
    dispatch(confirmOtpSuccess(res));
    const userEmail = localStorage.getItem("userEmail__client");
    dispatch(loginbyOtp(userEmail, otp));
  };
};

export const validateMFA = (userId, code, isRemember) => {
  return async (dispatch) => {
    dispatch(initAuthenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/validate-mfa`,
      {
        method: "POST",
        body: JSON.stringify({
          userId,
          code,
          isRemember,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(initAuthenticationFail(error));
    }
    const res = await response.json();
    dispatch(initAuthenticationSuccess(res.tokenResponse));
    dispatch(getUserProfile(res.tokenResponse.token));
    localStorage.setItem(AuthTokenKey, JSON.stringify(res.tokenResponse));
  };
};

export const logOutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
};

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem(AuthTokenKey);
  const adminSession = localStorage.getItem("Auth_adminSession");
  const CurrentUser = localStorage.getItem("CurrentUser__client");
  // const suspended = localStorage.getItem("Client__Account-Suspended");

  // if (!!suspended) {
  //   dispatch(accountSuspended());
  // }
  let UserToken = "";
  if (!AuthToken) {
    dispatch(logout());
    return;
  }
  UserToken = JSON.parse(AuthToken);
  const expireDate = new Date(UserToken.refreshTokenExpiryTime);
  const todaysDate = new Date();
  if (todaysDate > expireDate) {
    return dispatch(logout());
  }
  const data = {
    token: UserToken.token,
    user: JSON.parse(CurrentUser),
  };

  if (adminSession) {
    data.adminSession = JSON.parse(adminSession);
  }

  dispatch(autoAuthenticationSuccess(data));

  const timer = expireDate.getTime() - todaysDate.getTime();
  logOutTimer(dispatch, timer);
};

export const GetMFAUri = (userId) => {
  return async (dispatch) => {
    dispatch(fetchAuthentorUriPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/mfauthenticator/get-mfa-key`,
      {
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(fetchAuthentorUriFail(error));
      console.log(error)
    }
    const res = await response.json();
    dispatch(fetchAuthentorUriSuccess(res.authenticatorUri));
  };
};

export const VerifyRecaptha = (reCaptchaToken) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/identity/verifyrecaptcha`,
        {
          method: "POST",
          body: JSON.stringify({
            reCaptchaToken,
          }),
          headers: new Headers({
            "Content-type": "application/json",
          }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginAsAdmin = (userId, messageNotifications) => {
  return async (dispatch) => {
    dispatch(verificationPending());
    const current = getCurrentTokenState();
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/tokens/loginclientasadmin?adminId=${userId}`,
      {
        method: "POST",
        headers: new Headers({
          "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
          tenant: defaultTenant,
          Authorization: `Bearer ${current?.token}`,
          ClientAsAdmin: "admin"
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(verificationFail(error));
      dispatch(authenticationFail('Login as admin failed'))
      toast.error("Login as admin failed", {
        ...messageNotifications,
      });
      return;
    }
    const res = await response.json();
    const token = res.data;
    localStorage.removeItem("AuthToken__client");
    localStorage.removeItem("CurrentUser__client");
    window.location.href = `${process.env.REACT_APP_ADMIN_SITE_URL}/admin/sign-in-by-token?token=${encodeURI(JSON.stringify(token))}`;
  };
}
