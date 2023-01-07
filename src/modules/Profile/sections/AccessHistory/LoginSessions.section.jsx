import { Table } from "components";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkModule } from "lib/checkModule";
import { getLoginSessions } from "store";
import { exportToExcel, getDifference } from "lib";

export const LoginSessions = () => {
  const [data, setData] = useState([]);

  const { t } = useTranslation("/AccountSettings/ns");

  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: "Support",
    modules: userModules,
  });

  const columns = [
    {
      title: t("location"),
      dataIndex: "location",
      key: "location",
    },
    {
      title: t("status"),
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <div className="bg-[#1C3238] px-[8px] py-[4px] text-[#0BB783] w-[fit-content] rounded-[4px]">
          {status}
        </div>
      ),
    },
    {
      title: t("device"),
      key: "device",
      dataIndex: "device",
    },
    {
      title: t("ipAddressShort"),
      key: "ipAddress",
      dataIndex: "ipAddress",
    },
    {
      title: t("time"),
      key: "time",
      dataIndex: "time",
    },
  ];

  const { user } = useSelector((state) => state?.auth);
  const { loginSessions, loginSessionsLoading } = useSelector(
    (state) => state.logs
  );
  const dispatch = useDispatch();
  // get data from api

  useEffect(() => {
    if (user) {
      dispatch(getLoginSessions(user?.id));
    }
  }, [user, dispatch]);

  // set table data
  useEffect(() => {
    if (loginSessions) {
      const dataHolder = [];
      loginSessions.forEach((log) => {
        const date = new Date(log.loginTime);
        dataHolder.push({
          key: log.id,
          location: log.location,
          status: "OK",
          device: log.deviceName,
          ipAddress: log.ipAddress,
          time: getDifference(date),
          loginTime: log.loginTime,
        });
      });
      dataHolder.sort((a, b) => {
        return (
          new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime()
        );
      });
      setData(dataHolder);
    }
  }, [loginSessions]);

  return (
    <div className="mt-[20px] bg-[#1E1E2D] rounded-[8px]">
      <h6 className="text-white text-[16px] px-[32px] pt-[32px]">
        {t("loginSessions")}
      </h6>
      <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[32px] mb-[32px]" />
      <div className="up-custom-logs__table pb-[30px]">
        <Table
          data={data}
          columns={columns}
          fieldToFilter={"location"}
          btnData={{
            text: "Download All",
            onClick: () => {
              exportToExcel(loginSessions);
            },
          }}
          pagination={{
            pageSize: 5,
            position: ["bottomLeft"],
            showSizeChanger: false,
          }}
          permissions={permissions}
          loading={loginSessionsLoading}
          hideActions
          t={t}
        />
      </div>
    </div>
  );
};
