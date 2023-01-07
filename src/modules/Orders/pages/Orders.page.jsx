import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "components";
import { statusList } from "lib";
import { checkModule } from "lib/checkModule";
import { getOrders, getOrdersByClient } from "store";
import moment from "moment";
import { getClients, getOrderTemplates } from "store";
import { Button } from "antd";

export const Orders = () => {
  const { t } = useTranslation("/Bills/ns");
  const { settings } = useSelector((state) => state.appSettings);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state?.orders);
  const { userModules } = useSelector((state) => state?.modules);
  const { user } = useSelector((state) => state?.auth);

  useEffect(() => {
    (async () => {
      await dispatch(getOrdersByClient({ id: user?.id }));
      await dispatch(getOrderTemplates());
      await dispatch(getClients());
    })();
  }, [dispatch]);

  // Setting data properly
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { permissions } = checkModule({
    module: "Orders",
    modules: userModules,
  });

  useEffect(() => {
    setData([]);
    if (orders?.length) {
      const dataToSet = orders?.map((b) => {
        return {
          ...b,
          key: b?.id,
        };
      });
      setData(dataToSet);
    }
  }, [orders]);

  const AdvancedSearchOptions = {
    searchValues: {
      orderNo: "",
      dateAdded: "",
      status: "",
      total: "",
      client: "",
      admin: "",
      title: "",
    },
    fields: [
      {
        label: "Order Number",
        name: "orderNo",
        type: "text",
        variant: "text",
        placeholder: "Enter Order Number...",
      },
      {
        label: "Amount",
        name: "total",
        type: "number",
        variant: "text",
        placeholder: "Enter Amount...",
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        variant: "select",
        options: [
          { label: "Any", value: "" },
          { label: "Draft", value: 0 },
          { label: "Pending", value: 1 },
          { label: "Paid", value: 2 },
          { label: "Processing", value: 3 },
          { label: "Completed", value: 4 },
          { label: "Accepted", value: 5 },
          { label: "Canceled", value: 6 },
        ],
      },
      {
        label: "Search String",
        name: "title",
        type: "text",
        variant: "text",
        placeholder: "Enter Search String…",
      },
      {
        label: "Date",
        name: "dateAdded",
        type: "date",
        variant: "dateRange",
        placeholder: "12-13-2022",
      },
    ],
  };

  const columns = [
    {
      title: t("orderNo"),
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusValue = statusList(status);
        return (
          <div
            className={`bg-[${statusValue.bg}] px-[8px] py-[4px] text-[${statusValue.text}] w-[fit-content] rounded-[4px]`}
          >
            {statusValue.name}
          </div>
        );
      },
    },
    {
      title: t("total"),
      dataIndex: "totalPrice",
      key: "totalPrice",
      className: "text-right",
      render: (totalPrice) => {
        return <>{`$ ${totalPrice.toFixed(2)}`}</>;
      },
    },
    {
      title: t("dateAdded"),
      dataIndex: "createdOn",
      key: "createdOn",
      width: "180px",
      sorter: (a, b) => (moment(a?.createdOn) < moment(b?.createdOn) ? -1 : 1),
      render: (createdOn) =>
        moment(createdOn).format(settings?.dateFormat ?? "DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: t("dateModified"),
      dataIndex: "lastModifiedOn",
      key: "lastModifiedOn",
      width: "180px",
      sorter: (a, b) =>
        moment(a?.lastModifiedOn) < moment(b?.lastModifiedOn) ? -1 : 1,
      render: (lastModifiedOn) =>
        moment(lastModifiedOn).format(
          settings?.dateFormat ?? "DD/MM/YYYY HH:mm:ss"
        ),
    },
  ];

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Table
          AdvancedSearchOptions={AdvancedSearchOptions}
          columns={columns}
          data={data}
          loading={loading}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            position: ["bottomRight"],
            pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
          }}
          fieldToFilter="orderNo"
          handleStatus={async (values) => {
            setStatus(values);
            let details = {
              status: values,
              userId: user?.id,
            };

            if (startDate && endDate) {
              details["startDate"] = startDate;
              details["endDate"] = endDate;
            }
            await dispatch(getOrders(details));
          }}
          handleDateRange={async (date, dateString, id) => {
            let startDate = "";
            let endDate = "";
            let details = {
              userId: user?.id,
            };
            if (date) {
              startDate = date[0]._d;
              endDate = date[1]._d;
              details["startDate"] = startDate;
              details["endDate"] = endDate;
            }

            if (status) {
              details["status"] = status;
            }

            setStartDate(startDate);
            setEndDate(endDate);
            await dispatch(getOrders(details));
          }}
          permissions={permissions}
          t={t}
          viewAction={(record) => (
            <Button onClick={() => navigate(`./detail/${record?.id}`)}>
              View Details
            </Button>
          )}
        />
      </div>
    </div>
  );
};
