import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'antd';
import { Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

import { checkModule } from "lib/checkModule";
import { Table } from 'components';
import { MakePayment } from './MakePayment.section';
import { PaymentSuccess } from './PaymentSuccess.section';
import { PaymentFailed } from './PaymentFailed.section';
import { PaymentPending } from './PaymentPending.section';
import { getTransactions, payAllInvoices } from 'store';
import { getUnpaidInvoiceCount } from 'store';
import { getCurrentCreditBalance } from 'store';
import moment from 'moment';

const AccountSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactions, unpaidInvoiceCount, currentCreditBalance } = useSelector((state) => state.bills)
  const { settings } = useSelector((state) => state.appSettings);
  const { user } = useSelector((state) => state?.auth);
  const [showMakePayment, setShowMakePayment] = useState(false)
  const [showPaymentSucceed, setShowPaymentSucceed] = useState(false)
  const [showPaymentFailed, setShowPaymentFailed] = useState(false)
  const [showPaymentPending, setShowPaymentPending] = useState(false)
  const [recentInvoice, setRecentInvoice] = useState(null);

  const columns = [
    {
      title: 'DATE',
      dataIndex: "date",
      key: "label",
      width: "180px",
      render: (date) => date !== "N/A" ? moment(date).format(settings?.dateFormat ?? 'DD/MM/YYYY HH:mm:ss') : "N/A",
    },
    {
      title: 'DESCRIPTION',
      dataIndex: "description",
      key: "desc",
    },
    {
      title: 'AMOUNT',
      key: "amount",
      dataIndex: "amount",
      className: "text-right",
      width: "200px",
      render: (amount) => <>${amount.toFixed(2)}</>,
    },
  ];
  const { t } = useTranslation("/Users/ns");

  const { userModules } = useSelector((state) => state?.modules);
  const { permissions } = checkModule({
    module: "Bills",
    modules: userModules,
  });

  const onMakePayment = (amount, onSuccess) => {
    dispatch(payAllInvoices({
      data: {
        totalAmount: amount,
        tenant: "client",
        notes: "",
        invoiceNumber: "", 
      },
      onSuccess: () => {
        onSuccess();
        setShowMakePayment(false);
        setShowPaymentSucceed(true);
        dispatch(getUnpaidInvoiceCount(user.id));
      },
      onFail: () => {
        setShowMakePayment(false);
        setShowPaymentFailed(true);
      }
    }));
  }

  useEffect(() => {
    setRecentInvoice(transactions.length ? transactions[0] : null)
  }, [transactions]);

  useEffect(async () => {
    await dispatch(getTransactions());
    await dispatch(getUnpaidInvoiceCount(user.id));
    await dispatch(getCurrentCreditBalance());
  }, [])

  return (
    <div className="flex flex-col bg-custom-secondary rounded-lg p-4 md:p-[40px] flex-grow">
      <div className="flex flex-col lg:flex-row gap-[12px] mb-[20px]">
        <div className="flex flex-col md:flex-row gap-[12px] md:gap-[20px] bg-[#3A2434] rounded-lg px-[16px]">
          <div className="flex items-center justify-center">
            <span className='text-[#F64E60] font-normal text-[14px] line-[28px]'>Unpaid Invoices</span>
          </div>
          <div className="flex items-center justify-center py-[16px]">
            <Badge pill bg="danger" className='text-white text-[11px] px-[6px]'>{unpaidInvoiceCount}</Badge>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-[12px] md:gap-[20px] rounded-lg px-[16px] border-1 border-[#323248] border-dashed">
          <div className='text-[14px] text-[#92928F] items-center flex py-[8px]'>Credit Balance - ${currentCreditBalance ? currentCreditBalance.toFixed(2) : 0}</div>
          <div className="flex border-l border-[#323248] border-dashed my-[16px]" />
          <div className='text-[14px] text-[#92928F] items-center flex py-[8px]'>Recent Invoice - ${recentInvoice ? recentInvoice.amount.toFixed(2) : 0}</div>
          <div className="flex border-l border-[#323248] border-dashed my-[16px]" />
          <div className='flex items-center justify-center'>
            <Button
              type="link"
              className="d-block py-1 text-custom-info  no-underline px-[20px] rounded hover:text-white hover:bg-black/[.2] disabled:text-[#4b4b4b] ease-in duration-100 border-0"
              onClick={() => navigate(`/client/dashboard/billings/download/${recentInvoice.id}`)}
              disabled={!recentInvoice}
            >
              <span className="text-[13px] leading-[20px]">
                Download PDF
              </span>
            </Button>
            <Button
              type="link" 
              className="d-block py-1 text-custom-info  no-underline px-[20px] rounded hover:text-white hover:bg-black/[.2] disabled:text-[#4b4b4b] ease-in duration-100 border-0"
              onClick={() => navigate(`/client/dashboard/billings/detail/${recentInvoice.id}`)}
              disabled={!recentInvoice}
            >
              <span className="text-[13px] leading-[20px]">
                View Details
              </span>
            </Button>
          </div>
        </div>

        <div className="flex-grow-1 min-w-[140px] md:text-right">
          <button
            className="leading-5 text-white capitalize rounded-lg text-normal btn btn-primary bg-custom-info px-[32px] py-[16px] border-0 font-light"
            onClick={() => setShowMakePayment(true)}
          >
            Add Credit
          </button>
        </div>
      </div>

      <div className="flex-grow">
        <Table
          data={transactions}
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
                <Button onClick={() => navigate(`/client/dashboard/billings/detail/${record.id}`)}>View Details</Button>
                <Button onClick={() => navigate(`/client/dashboard/billings/download/${record.id}`)}>Download PDF</Button>
              </>
            );
          }}
          t={t}
        />
      </div>

      <MakePayment
        show={showMakePayment}
        setShow={setShowMakePayment}
        handleSubmit={onMakePayment}
        currentCreditBalance={currentCreditBalance}
      />
      <PaymentSuccess
        show={showPaymentSucceed}
        setShow={setShowPaymentSucceed}
      />
      <PaymentFailed
        show={showPaymentFailed}
        setShow={setShowPaymentFailed}
      />
      <PaymentPending
        show={showPaymentPending}
        setShow={setShowPaymentPending}
      />
    </div>
  );
};

export default AccountSummary;
