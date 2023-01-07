import axiosMain from "axios";
import { logout } from "store/Slices/authSlice";
import { axios } from "./axios";
import { AuthTokenKey, defaultTenant } from "./constants";

function setCurrentTokenState(tokenState) {
  localStorage.setItem(AuthTokenKey, JSON.stringify(tokenState));
}

export function getCurrentTokenState() {
  const AuthToken = localStorage.getItem(AuthTokenKey);
  const tokenObj = JSON.parse(AuthToken);
  return tokenObj;
}

function refreshToken() {
  const current = getCurrentTokenState();
  return axiosMain.post(
    `${process.env.REACT_APP_BASEURL}/api/tokens/refresh`,
    {
      token: current?.token,
      refreshToken: current?.refreshToken,
    },
    {
      headers: {
        "Content-type": "application/json",
        "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
        tenant: defaultTenant,
      },
    }
  );
}

const setUpInterceptor = ({ store, navigate }) => {
  const handleError = async (error) => {
    return Promise.reject(error);
  };

  axios.interceptors.request.use(async (config) => {
    /* your logic here */
    const AuthToken = localStorage.getItem(AuthTokenKey);
    const tokenObj = JSON.parse(AuthToken);
    const token = tokenObj?.token;
    config.headers = {
      ...config.headers,
      "Content-type": "application/json",
      "gen-api-key": process.env.REACT_APP_GEN_APIKEY,
      tenant: defaultTenant,
      Authorization: `Bearer ${token}`,
    };
    return config;
  }, handleError);

  let refreshing_token = null;
  axios.interceptors.response.use(
    async (response) => response,
    async (error) => {
      const config = error.config;
      if (error.response && error.response.status === 401 && !config._retry) {
        config._retry = true;
        try {
          refreshing_token = refreshing_token
            ? refreshing_token
            : refreshToken();
          let res = await refreshing_token;
          refreshing_token = null;
          if (res?.data?.data?.token) {
            setCurrentTokenState(res?.data?.data);
          }
          return axios(config);
        } catch (err) {
          store.dispatch(logout());
          navigate("/client/sign-in");
        }
      }
    }
  );
};

export default setUpInterceptor;
