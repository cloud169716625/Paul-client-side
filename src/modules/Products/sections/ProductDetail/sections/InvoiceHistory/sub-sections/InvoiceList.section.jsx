import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "components";
import { checkModule } from "lib/checkModule";
import moment from "moment";
import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getInvoiceByID } from "store/Actions/invoiceActions";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoiceDownload } from ".";

export const InvoiceList = ({ myOrders }) => {
  const navigate = useNavigate()
  const para = useParams();
  const { t } = useTranslation("/Bills/ns");
  const { userModules } = useSelector((state) => state?.modules);
  const { users, onlineUsers } = useSelector((state) => state?.users);
  const { invoices, invoice, loading } = useSelector((state) => state?.invoice);
  const { user } = useSelector((state) => state?.auth);
  const { product } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    if (invoice?.billNo === invoiceNo && !loading) {
      const dropdownOpen = document.getElementsByClassName("ant-dropdown-open custom-table__table-dropdown")
      dropdownOpen?.[0]?.click()
      setTimeout(() => {
        const downloadLink = document.getElementsByClassName("invoicePDF")
        downloadLink?.[0]?.click()
      }, 1000)
      setInvoiceNo('')
    }
  }, [loading && invoice?.billNo]);

  useEffect(() => {
    if (invoices) {
      let dataArr = [];
      invoices.forEach((key) => {
        dataArr.push({
          key: key?.id,
          id: key?.id,
          invoiceno: key?.billNo,
          invoicedate: key?.createdOn,
          duedate: key?.dueDate,
          total: key?.totalPrice,
          status: key?.status,
        });
      });
      setData(dataArr);
    }
  }, [invoices]);

  let usersData = [{ label: "Any", value: "" }];
  if (users?.length) {
    users?.forEach((user) => {
      const isOnline = onlineUsers?.find((admin) => admin?.userId === user?.id)
        ? true
        : false;
      usersData.push({
        value: user?.id,
        label: user?.fullName
          ? `${user?.fullName}${isOnline ? "   (Online)" : ""}`
          : "N/A",
        isActive: isOnline ? true : false,
      });
    });
  }

  const { permissions } = checkModule({
    module: "Orders",
    modules: userModules,
  });

  const columns = [
    {
      title: ("Invoice Number"),
      dataIndex: "invoiceno",
      key: "billNo",
      sorter: (a, b) => (a?.id < b?.id ? -1 : 1),
    },
    {
      title: ("Invoice Date"),
      dataIndex: "invoicedate",
      key: "invoicedate",
      sorter: (a, b) => (moment(a?.invoicedate) < moment(b?.invoicedate) ? -1 : 1),
      render: (text, record) => record?.invoicedate !== "N/A" ? moment(record?.invoicedate).format('MMMM Do, YYYY') : "N/A",
      width: "20%",
    },
    {
      title: ("Due Date"),
      dataIndex: "duedate",
      key: "duedate",
      sorter: (a, b) => (moment(a?.duedate) < moment(b?.duedate) ? -1 : 1),
      render: (text, record) => record?.duedate !== "N/A" ? moment(record?.duedate).format('MMMM Do, YYYY') : "N/A",
      width: "20%",
    },
    {
      title: ("total"),
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => (a?.total < b?.total ? -1 : 1),
      render: (total) => {
        return <>{`$${total}`}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        let text = "";
        switch (status) {
          case 0:
            color = "bg-[#392F28] text-[#FFA800]";
            text = "Pending";
            break;
          case 1:
            color = "bg-[#392F28] text-[#FFA800]";
            text = "Active";
            break;
          case 2:
            color = "bg-[#1C3238] text-[#0BB783]";
            text = "Cancelled";
            break;
          case 3:
            color = "bg-[#1C3238] text-[#0BB783]";
            text = "PROCESSING";
            break;
          case 4:
            color = "bg-[#1C3238] text-[#0BB783]";
            text = "COMPLETED";
            break;
          case 5:
            color = "bg-[#1C3238] text-[#0BB783]";
            text = "ACCEPTED";
            break;
          case 6:
            color = "bg-[#3A2434] text-[#F64E60]";
            text = "CANCELLED";
            break;
          default:
            color = "";
            text = "UNKNOWN";
        }
        return (
          <div
            className={`${color} px-[8px] py-[4px] w-[fit-content] rounded-[4px]`}
          >
            {text}
          </div>
        );
      },
    },
  ];

  return (
    <div className="pt-[30px]">
      <div className="p-[40px] pb-[24px] bg-[#1E1E2D] rounded-[8px]">
        <Table
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            position: ["bottomRight"],
            pageSizeOptions: ["5", "10", "20", "50", "100", "200"],
          }}
          hideSearch={true}
          columns={columns}
          loading={loading}
          data={data}
          onRow={(record) => {
            return {
              onClick: () => {
                dispatch(getInvoiceByID(record?.id));
                navigate(
                  `/client/dashboard/products/list/invoice/details/${product?.id ? product?.id : para?.id}/${record?.id}`
                );
              },
            };
          }}
          editAction={(record) => (
            <Button
              onClick={() => {
                dispatch(getInvoiceByID(record?.id));
                navigate(
                  `/client/dashboard/products/list/invoice/details/${product?.id ? product?.id : para?.id}/${record?.id}`
                );
              }}
            >
              View Invoice
            </Button>
          )}
          deleteAction={(record) => (
            <Button
              onClick={() => {
                dispatch(getInvoiceByID(record?.id));
                record?.invoiceno && setInvoiceNo(record.invoiceno)
              }}
            >
              Download PDF
            </Button>
          )}
          permissions={permissions}
          t={t}
        />
      </div>
      <PDFDownloadLink
        className="invoicePDF"
        document={<InvoiceDownload invoice={invoice} user={user} />}
        fileName={`${invoice?.billNo}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          ""
        }
      </PDFDownloadLink>
    </div>
  );
};