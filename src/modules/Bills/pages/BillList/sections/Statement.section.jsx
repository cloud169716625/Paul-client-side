import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import DateInput from "components/Form/DateInput";
import Tag from "components/Tag";
import { formatPrice } from "helpers/formters.helper";
import { Table } from "components";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { checkModule } from "lib/checkModule";

const tagStyles = {
  invoice: "bg-custom-blue-dark text-custom-blue",
  payment: "bg-custom-purple-dark text-custom-purple",
  refused: "bg-custom-red-dark text-custom-red",
  credit: "bg-custom-green-dark text-custom-green",
};

const Statement = () => {
  const { t } = useTranslation("/Bills/ns");
  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: "Bills",
    modules: userModules,
  });
  const [bills, setBills] = useState([]);

  const columns = [
    {
      title: 'DESCRIPTION',
      dataIndex: "description",
      key: "description",
    },
    {
      title: 'DATE',
      dataIndex: "date",
      key: "date",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (value) => formatPrice(value),
    },
    {
      title: "BALANCE",
      dataIndex: "balance",
      key: "balance",
      render: (value) => formatPrice(value),
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      render: (value) => <Tag className={tagStyles[value]} label={value} />,
    },
  ];

  useEffect(() => {
    setBills([
      {
        description: "Invoice # 01",
        date: "Sep 25th, 2022",
        amount: 2000,
        balance: -200,
        type: "invoice",
      },
      {
        description: "Credit Card Payment",
        date: "Sep 25th, 2022",
        amount: 2000,
        balance: 200,
        type: "payment",
      },
      {
        description: "Credit Removed",
        date: "Sep 25th, 2022",
        amount: 2000,
        balance: -200,
        type: "refused",
      },
      {
        description: "Credit Issued",
        date: "Sep 25th, 2022",
        amount: 2000,
        balance: 200,
        type: "credit",
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col bg-custom-secondary rounded-lg p-4 md:p-[40px] flex-grow">
      <div className="flex flex-col lg:flex-row gap-[12px] mb-[20px]">
        <div className="flex flex-col md:flex-row gap-[12px] md:gap-[20px]">
          <DateInput placeholder="From: October 1st, 2022" />

          <DateInput placeholder="To: October 14th, 2022" />
        </div>

        <div className="flex-grow-1 min-w-[240px] md:text-right">
          <button className="leading-5 text-white capitalize rounded-lg text-normal btn btn-primary bg-custom-info px-[32px] py-[16px] border-0 font-light">
            Download state batch
          </button>
        </div>
      </div>

      <div className="flex-grow">
        <Table
          data={bills}
          columns={columns}
          btnData={null}
          customFilterSort={<></>}
          pagination={false}
          rowSelection={null}
          permissions={permissions}
          editAction={(record) => {
            return (
              <>
                {/* TODO: Replace with UID */}
                <Button onClick={() => {}}>View Details</Button>
                <Button>Download PDF</Button>
              </>
            );
          }}
          t={t}
        />
      </div>
    </div>
  );
};

export default Statement;
