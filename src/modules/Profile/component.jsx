import { useState } from "react";
import {
  UserProfileCard,
  SubUser,
  Navigation,
  SigninMethods,
  APIKeys,
  SubUsers,
  Logs,
  LoginSessions,
} from "./sections";
// import { SubUsers } from "./sections";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import "./styles.scss";

export const Profile = () => {
  const [active, setActive] = useState("SETTINGS");

  const links = [
    { label: "SETTINGS", onClick: () => setActive("SETTINGS") },
    { label: "API KEYS", onClick: () => setActive("API KEYS") },
    { label: "SUB-USERS", onClick: () => setActive("SUB-USERS") },
    { label: "ACCESS HISTORY", onClick: () => setActive("ACCESS HISTORY") },
  ];

  const { isLoading, user } = useSelector((state) => state?.auth);

  return (
    <div className="profile">
      <div className="profile-details min-w-[60vh]">
        {isLoading || user === null ? (
          <Spin
            size="large"
            style={{ gridColumn: "1/3", alignSelf: "center" }}
          />
        ) : (
          <>
            <div className="profile-details__left">
              {/* USER PROFILE CARD */}
              <UserProfileCard />
              <div className="mt-4">
                <SubUser />
              </div>
            </div>
            <div className="profile-details__right">
              <Navigation active={active} links={links} />
              {active === "SETTINGS" ? <SigninMethods /> : <></>}
              {active === "API KEYS" ? <APIKeys /> : <></>}
              {active === "SUB-USERS" ? <SubUsers /> : <></>}
              {active === "ACCESS HISTORY" ? (
                <>
                  <LoginSessions />
                  <Logs />
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
