import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getUserProfile } from "store";
import { SaveTokenInLocalStorage } from "store/Actions/AuthActions";
import { initAuthenticationSuccess, setAdminSession } from "store/Slices/authSlice";
import { closeLockScreen } from "store/Slices/settingSlice";

export function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const SignInByToken = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useQuery().get('token');
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    if (userToken && userToken.token) {
      dispatch(initAuthenticationSuccess(userToken));
      dispatch(closeLockScreen());
      dispatch(getUserProfile(userToken.token));
      SaveTokenInLocalStorage(dispatch, userToken);
    }

    if (userToken && userToken.adminSession) {
      dispatch(setAdminSession(userToken.adminSession))
      localStorage.setItem('Auth_adminSession', JSON.stringify(userToken.adminSession));
    }
  }, [dispatch, userToken])

  useEffect(() => {
    if (!token) {
      navigate('/client/sign-in');
    };

    try {
      const parsedToken = JSON.parse(token);
      setUserToken(parsedToken)
    } catch(e) {
      navigate('/client/sign-in')
      console.error(e)
    }
  }, [token])

  return (
    <></>
  )
}

export default SignInByToken;