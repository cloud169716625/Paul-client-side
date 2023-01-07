import React from "react";
import "./InvoiceDetail.style.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import moment from "moment";

export const InvoiceDetail = () => {
  const { t } = useTranslation("/Bills/ns");
  const { invoice, loading } = useSelector((state) => state.invoice);
  const { user } = useSelector((state) => state?.auth);

  return (
    <div className="users text-center pt-[20px]">
      {loading ?
        <Spin
          size="large"
          className="pt-[20px]"
        />
        :
        <div className="bg-[#1E1E2D] rounded-lg text-left p-[30px]">
          <div className="users">
            <div className="row">
              <div className="column">
                <div className="flex justify-between items-center">
                  <h4 className="text-white text-[24px]">{invoice?.billNo}</h4>
                </div>
                <div className="mt-[40px]">
                  <h6 className="text-[#474761] text-[14px]">{t("Invoice Date")}</h6>
                  <p className="text-[#fff]  text-[14px] mt-[4px]">
                    {moment(invoice?.createdOn).format('MMMM Do, YYYY') || "N/A"}
                  </p>
                </div>
                <div className="mt-[20px]">
                  <h6 className="text-[#474761] text-[14px]">{t("Due Date")}</h6>
                  <p className="text-[#fff]  text-[14px] mt-[4px]">
                    {moment(invoice?.dueDate).format('MMMM Do, YYYY') || "N/A"}
                    {moment(invoice?.dueDate).isSame(new Date(), "day")}{" "}
                    {moment(invoice?.dueDate).isSame(new Date(), "day") ? (
                      <span className="text-[#F64E60] inline-block">
                        Due Today
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
              <div className="column" style={{ float: 'right' }}>
                <div className="container">
                  <div className="text-[#474761] text-[24px]"> Bill to</div>
                  <div className="ml-[15px] mr-[10px]"><img src="/icon/logo.svg" alt="logo" className="h-[50px]" /></div>
                  <div className="text-[white] text-[24px]">Company Name</div>
                </div>
                <div className="text-[#3699FF] p-[0]" style={{ float: 'right' }}>{user?.companyName || 'N/A'}</div>
                <div className="container">
                  <div className="row pt-[30px]" style={{ textAlign: 'end' }}>
                    <div className="col">
                      <h6 className="text-[#474761] text-[14px]" >Address</h6>
                      <p className="text-[#fff]  text-[14px] mt-[4px]">
                        {user?.address1 || 'N/A'}, {user?.address2 || 'N/A'}
                      </p>
                    </div>
                    <div className="col">
                      <h6 className="text-[#474761] text-[14px]">Full Name</h6>
                      <p className="text-[#fff]  text-[14px] mt-[4px]">{user?.fullName || 'N/A'}</p>
                    </div>
                    <div className="w-100"></div>
                    <div className="col pt-[20px]">
                      <h6 className="text-[#474761] text-[14px]" >Email</h6>
                      <p className="text-[#fff]  text-[14px] mt-[4px]">{user?.email || 'N/A'}</p>
                    </div>
                    <div className="col pt-[20px]">
                      <h6 className="text-[#474761] text-[14px]" >Phone Number</h6>
                      <p className="text-[#fff]  text-[14px] mt-[4px]">{user?.phoneNumber || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[80px]">
              <div className="flex items-center justify-between">
                <h6 className="text-[#474761] text-[12px] uppercase">
                  {t("SAMPLE PRODUCT 1")}
                </h6>
                <h6 className="text-[#474761] text-[12px] uppercase">
                  {t("AMOUNT")}
                </h6>
              </div>
              <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
              {invoice?.orderProductLineItems?.map((data, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <h6 className="text-[#fff] text-[14px]">
                      <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#F64E60] mr-[5px]"></span>
                      {data?.lineItem}
                    </h6>
                    <h6 className="text-[#fff] text-[14px]">
                      ${data?.price}
                    </h6>
                  </div>
                  <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-[30px]">
                <h6 className="text-[#fff] text-[14px]">
                  <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                  Sub Total
                </h6>
                <h6 className="text-[#fff] text-[14px]">${invoice?.subTotal || 'N/A'}</h6>
              </div>
              <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
              <div className="flex items-center justify-between">
                <h6 className="text-[#fff] text-[14px]">
                  <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                  Tax
                </h6>
                <h6 className="text-[#fff] text-[14px]">${invoice?.vat || 'N/A'}</h6>
              </div>
              <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
              <div className="flex items-center justify-between">
                <h6 className="text-[#fff] text-[14px]">
                  <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                  Total
                </h6>
                <h6 className="text-[#fff] text-[14px]">${invoice?.totalPrice || 'N/A'}</h6>
              </div>
              <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
