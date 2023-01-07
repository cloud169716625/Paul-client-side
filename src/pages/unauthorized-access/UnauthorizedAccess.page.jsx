import { Button } from "components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function UnauthorizedAccess() {
  const { t } = useTranslation("/UnauthorizedAccessPage/ns");
  return (
    <div className="h-screen d-flex ">
      <div className="p-10 my-auto col-md-6 md:p-20">
        <div>
          <img
            src="/icon/logo.svg"
            alt={t("suspendedTitle")}
            className="w-20 h-20"
          />
          <h3 className="mt-5 text-4xl font-normal text-white">{t("title")}</h3>
          <p className="pb-5 mb-5 text-base border-indigo-900 custom-text-light border-b-1 border-dashed-bottom">
            Sorry, You are not authorized to access this page. In order to
            access this page you must be logged in with valid credentials.
          </p>
        </div>

        <div>
          <Link to="/client/sign-in">
            <Button htmlType="button">Login with Username & Password</Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center col d-none d-md-flex bg-custom-secondary">
        <img src="/icon/unauthorized-access.svg" alt="" />
      </div>
    </div>
  );
}

export default UnauthorizedAccess;
