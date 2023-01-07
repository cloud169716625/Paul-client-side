import React from 'react';
import { useTranslation } from "react-i18next";

function AccountSuspended() {
  const { t } = useTranslation("/AccountSuspended/ns");
  return (
    <div className="h-screen d-flex">
      <div className="p-10 my-auto col-md-6 md:p-20">
        <div>
          <img src="/icon/logo.svg" alt={t("title")} className="w-20 h-20" />
          <h3 className="mt-5 text-4xl font-normal text-white">{t("title")}</h3>
          <p className="pb-5 mb-5 text-base custom-text-light border-dashed-bottom">
            {t("description1")}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-white">{t("subTitle")}</h3>
          <p className="mb-5 text-base custom-text-light">
            {t("description2")}
          </p>
          <button
            type="button"
            className="px-20 py-3 text-white duration-200 ease-in bg-blue-500 rounded-lg hover:bg-blue-700"
          >
            {t("btnSupport")}
          </button>
        </div>
      </div>
      <div className="items-center justify-center col d-none bg-custom-secondary d-md-flex">
        <img src="/icon/account-suspended.svg" alt={t("title")} />
      </div>
    </div>
  );
}

export default AccountSuspended;
