import React from 'react';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import Logo from "components/Logo.component";

function Error404() {
  const { t } = useTranslation("/Error404/ns");
  return (
    <div className="flex h-screen">
      <div className="col-md-6 my-auto p-10 md:p-20">
        <div>
          <Logo />
          <h3 className="text-4xl text-white font-normal mt-5">{t("Error404")}</h3>
          <p className=" mb-5 text-base custom-text-light">
            {t("Description")}
          </p>
          <div className="text-white">
            <span className="mr-2">Back to</span>
            <Link to="/" className="text-info">
              Home
            </Link>
          </div>
        </div>
      </div>

      <div className="col d-none d-md-flex items-center justify-center  bg-custom-secondary">
        <img src="/icon/error404.svg" alt="" />
      </div>
    </div>
  );
}

export default Error404;
