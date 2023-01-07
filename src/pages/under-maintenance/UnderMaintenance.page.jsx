import { Statistic } from "antd";
import { Button } from "components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import "./UnderMaintenance.styles.scss";

const { Countdown } = Statistic;

function UnderMaintenance() {
  const { t } = useTranslation("/UnderMaintenance/ns");
  const [finished, setFinished] = useState(false);
  const { maintenanceDetails } = useSelector((state) => state?.settings);

  useEffect(() => {
    if (moment(maintenanceDetails?.expirationDate).isBefore(moment())) {
      setFinished(true);
    }
  }, [maintenanceDetails]);

  return (
    <div className="grid h-screen grid-cols-2">
      <div className="p-10 my-auto md:p-20">
        <img
          src="/icon/logo.svg"
          alt={t("suspendedTitle")}
          className="w-20 h-20"
        />
        <h3 className="mt-5 text-4xl text-white">{t("title")}</h3>
        <p className="pb-5 mb-5 text-base custom-text-light border-dashed-bottom">
          {maintenanceDetails?.reason}
        </p>
        <div className="countdown">
          {finished ? (
            <div className="ant-statistic-content">
              <Link to="/admin/sign-in">
                <Button htmlType="button">
                  Login with Username & Password
                </Button>
              </Link>
            </div>
          ) : (
            <Countdown
              value={maintenanceDetails?.expirationDate}
              format="DD : HH : mm : ss"
              onFinish={() => setFinished(true)}
            />
          )}
        </div>
      </div>
      <div className="flex bg-custom-secondary align-items-center justify-content">
        <img src="/icon/under-maintenance.svg" alt="" className="mx-auto" />
      </div>
    </div>
  );
}

export default UnderMaintenance;
