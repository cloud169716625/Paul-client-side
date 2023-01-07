import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Input, Table } from "components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { checkModule } from "lib/checkModule";
import { Form, Formik } from "formik";
import moment from "moment";

export const CancellationRequests = () => {
  const navigate = useNavigate();
  const { clients } = useSelector((state) => state?.users);
  const { t } = useTranslation("/Bills/ns");
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: "Products",
    modules: userModules,
  });

  const Options = [
    { label: "Hourly", value: 0 },
    { label: "Monthly", value: 1 },
    { label: "Quarterly", value: 2 },
    { label: "SemiAnnually", value: 3 },
    { label: "Annually", value: 4 },
    { label: "Biennially", value: 5 },
    { label: "Triennially", value: 6 },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => (a?.id < b?.id ? -1 : 1),
      render: (text) => <>{text.substr(text.length - 5)}</>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a?.name < b?.name ? -1 : 1),
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-[16px]">
            {record?.base64Image ? (
              <img
                className="w-[100px] h-[98px] rounded-[8px] object-contain bg-[yellow]"
                src={record?.base64Image}
                alt={record?.name}
              />
            ) : null}
            <p className="text-white text-[14px]">{record?.description}</p>
          </div>
        );
      },
      width: "50%",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => (a?.total < b?.total ? -1 : 1),
      render: (text, record) => {
        let sum = 0;
        record?.productLineItems?.forEach((item) => {
          if (!item?.isDeleted) {
            sum += item?.price;
          }
        });
        return <>${sum}</>;
      },
    },
    {
      title: "Client Name",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => (a?.userId < b?.userId ? -1 : 1),
      render: (text) => {
        const client = clients?.find((client) => client?.id === text);
        return client?.fullName ? client.fullName : "N/A";
      },
    },
    {
      title: "Billing Cycle",
      dataIndex: "billingCycle",
      key: "billingCycle",
      render: (cycle) => {
        let text = "";
        switch (cycle) {
          case 0:
            text = Options[0]?.label;
            break;
          case 1:
            text = Options[1]?.label;
            break;
          case 2:
            text = Options[2]?.label;
            break;
          case 3:
            text = Options[3]?.label;
            break;
          case 4:
            text = Options[4]?.label;
            break;
          case 5:
            text = Options[5]?.label;
            break;
          case 6:
            text = Options[6]?.label;
            break;

          default:
            text = "UNKNOWN";
        }
        return text;
      },
    },
    {
      title: "Next Due Date",
      dataIndex: "nextDueDate",
      key: "nextDueDate",
      sorter: (a, b) =>
        moment(a?.nextDueDate) < moment(b?.nextDueDate) ? -1 : 1,
      render: (nextDueDate) => moment(nextDueDate).format("DD-MM-YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div
          className={`${
            status === 0
              ? "bg-[#392F28] text-[#FFA800]"
              : status === 1
              ? "bg-[#1C3238] text-[#0BB783]"
              : "bg-[#3A2434] text-[#F64E60]"
          } px-[8px] py-[4px] w-[fit-content] rounded-[4px]`}
        >
          {status === 0 ? "PENDING" : status === 1 ? "CONFIRMED" : "CANCELLED"}
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state?.products);
  const categoriesLoading = useSelector((state) => state?.categories?.loading);

  return (
    <div className="p-[40px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Formik initialValues={{ selectFilter: "name" }}>
          {({ values }) => (
            <Form>
              <Table
                columns={columns}
                data={products?.filter((product) => product?.status === 6)}
                loading={categoriesLoading || loading}
                fieldToFilter={values?.selectFilter}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      navigate(
                        `/admin/dashboard/billing/products-services/list/details/${record?.id}`
                      );
                    },
                  };
                }}
                editAction={(record) => (
                  <Button
                    onClick={() => {
                      navigate(
                        `/admin/dashboard/billing/products-services/list/details/${record?.id}`
                      );
                    }}
                  >
                    View
                  </Button>
                )}
                deleteAction={(record) => (
                  <Button>
                    Delete
                  </Button>
                )}
                permissions={permissions}
                customAdditionalBody={
                  <div className="min-w-[250px] flex items-center gap-[10px]">
                    <div className="text-white text-[14px] w-[100px]">
                      Filter By:
                    </div>
                    <Input
                      name="selectFilter"
                      type="select"
                      options={[
                        { value: "name", label: "Name" },
                        { value: "total", label: "Total" },
                        { value: "status", label: "Status" },
                      ]}
                    />
                  </div>
                }
                t={t}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};