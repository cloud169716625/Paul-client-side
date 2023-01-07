// ProtectedRoute.js
import { lazy } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const UnderMaintenance = lazy(() =>
  import("pages/under-maintenance/UnderMaintenance.page")
);
const SuspendedAccount = lazy(() =>
  import("pages/account-suspended/AccountSuspended.page")
);
const LockScreen = lazy(() => import("pages/lock-screen/LockScreen.page"));
const UnauthorizedAccess = lazy(() =>
  import("pages/unauthorized-access/UnauthorizedAccess.page")
);

export const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);
  const { maintenance, suspended } = useSelector((state) => state.settings);
  const isIdle = useSelector((state) => state.settings.isIdle);

  if (maintenance) {
    return <UnderMaintenance />;
  }

  if (!token) {
    return <UnauthorizedAccess />;
  }

  if (token && !maintenance && suspended) {
    return <SuspendedAccount />;
  }

  if (token && !maintenance && !suspended && isIdle) {
    return <LockScreen />;
  }

  // returns child route elements
  return <Outlet />;
};
