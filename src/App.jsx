import React, { Suspense, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import IdleTimer from "react-idle-timer";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Error404 } from "pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AutoAuthenticate, maintenanceStatus } from "store/Actions/AuthActions";
import { initiateLockScreen } from "store/Slices/settingSlice";
import { getUserModules } from "store/Actions/ModuleActions";
import { getAppSettingsByTenant } from "store";
import { getBrand } from "store/Actions/BrandActions";
import setUpInterceptor from "lib/axios-interceptors";
import store from "store";
import { ProtectedRoute } from "components/ProtectedRoute.component";
import PageLoader from "components/Loader/PageLoader";
import Dashboard from "pages/Dashboard";
import { getDataCounts } from "store/Actions/count";

const SignIn = React.lazy(() => import("pages/sign-in/SignIn.page"));
const SignInByToken = React.lazy(() => import("pages/sign-in/SignInByToken.page"));
const SignUp = React.lazy(() => import("pages/sign-up/SignUp.page"));
const ProductList = React.lazy(() =>
  import("pages/products-list/products.page")
);
const ResetPassword = React.lazy(() =>
  import("pages/reset-password/ResetPassword.page")
);
const ForgotPassword = React.lazy(() =>
  import("pages/forgot-password/ForgotPassword.page")
);
const EmailVerification = React.lazy(() =>
  import("pages/email-verification/EmailVerification.page")
);
const ConfirmOtp = React.lazy(() =>
  import("pages/one-time-password/OneTimePassword.page")
);
const UnderMaintenance = React.lazy(() =>
  import("pages/under-maintenance/UnderMaintenance.page")
);
const SuspendedAccount = React.lazy(() =>
  import("pages/account-suspended/AccountSuspended.page")
);
const LockScreen = React.lazy(() =>
  import("pages/lock-screen/LockScreen.page")
);

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state?.auth?.user);
  const { token } = useSelector((state) => state?.auth);
  const { maintenance, suspended } = useSelector((state) => state.settings);
  const isIdle = useSelector((state) => state.settings.isIdle);
  const TimeOut = 1000 * 900;
  const idleTimer = useRef(null);
  const brandId = localStorage.getItem("brandId");

  const OnIdle = () => {
    dispatch(initiateLockScreen());
  };
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await AutoAuthenticate(dispatch);
      await dispatch(maintenanceStatus());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (brandId) {
      dispatch(getBrand(brandId));
    }
  }, [brandId, dispatch]);

  useEffect(() => {
    if (user?.id && token) {
      (async () => {
        await dispatch(getAppSettingsByTenant({ isAdmin: true }));
        // await dispatch(getDepartmentsByUserId({ id: user?.id }));
        await dispatch(getUserModules({ id: user?.id }));
        await dispatch(getDataCounts());
      })();
    }
  }, [user, token, dispatch]);

  const navigate = useNavigate();

  setUpInterceptor({ store, navigate });

  return (
    <div className="flex items-center content-center App bg-custom-main">
      <IdleTimer ref={idleTimer} onIdle={OnIdle} timeout={TimeOut} />
      <ToastContainer />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/client/sign-in-by-token"
            element={
              isLoggedIn ? <Navigate to="/client/dashboard" /> : <SignInByToken />
            }
          />
          <Route path="/" element={<Navigate to="/client/sign-in" />} />
          <Route
            path="/client/lock-screen"
            element={isIdle ? <LockScreen /> : <Navigate to={-1} />}
          />
          <Route
            path="/client/account-suspended"
            element={
              !suspended ? (
                <Navigate to="/client/sign-in" />
              ) : (
                <SuspendedAccount />
              )
            }
          />
          <Route
            path="/client/verify-email/:userId"
            element={
              suspended ? (
                <Navigate to="/client/account-suspended" />
              ) : isLoggedIn ? (
                <Navigate to="/client/dashboard" />
              ) : (
                <EmailVerification />
              )
            }
          />
          <Route
            path="/client/reset-password"
            element={
              suspended ? (
                <Navigate to="/client/account-suspended" />
              ) : isLoggedIn ? (
                <Navigate to="/client/dashboard" />
              ) : (
                <ResetPassword />
              )
            }
          />
          <Route
            path="/client/forgot-password"
            element={
              suspended ? (
                <Navigate to="/client/account-suspended" />
              ) : isLoggedIn ? (
                <Navigate to="/client/dashboard" />
              ) : (
                <ForgotPassword />
              )
            }
          />
          <Route
            path="/client/one-time-password"
            element={
              suspended ? (
                <Navigate to="/client/account-suspended" />
              ) : isLoggedIn ? (
                <Navigate to="/client/dashboard" />
              ) : (
                <ConfirmOtp />
              )
            }
          />
          <Route
            path="/client/under-maintenance"
            element={maintenance ? <UnderMaintenance /> : <Navigate to={-1} />}
          />
          <Route
            path="/client/sign-in"
            element={
              isLoggedIn ? <Navigate to="/client/dashboard" /> : <SignIn />
            }
          />
          <Route path="/client/products-list" element={<ProductList />} />
          <Route
            path="/client/sign-up"
            element={
              maintenance ? (
                <Navigate to="/client/under-maintenance" />
              ) : isLoggedIn ? (
                <Navigate to="/client/dashboard" />
              ) : (
                <SignUp />
              )
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/client/dashboard/*"
              element={<Dashboard />}
            />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
