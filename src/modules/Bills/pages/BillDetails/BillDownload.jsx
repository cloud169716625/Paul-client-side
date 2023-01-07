import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

export const BillDownload = () => {
  const { t } = useTranslation("/Bills/ns");
  const brand = useSelector((state) => state?.brand?.brand);
  const loading = false;
  const invoice = {
    billNo: "Invoice #12580",
    orderProductLineItems: [
      {
        lineItem: "Product Item Title",
        price: 200,
      },
    ],
    subTotal: "300.00",
    vat: "0.00",
    totalPrice: "700.00",
  };

  return (
    <div className="text-center p-[24px] md:p-[40px]">
      {loading || invoice === null ? (
        <Spin size="large" style={{ gridColumn: "1/3", alignSelf: "center" }} />
      ) : (
        <div className="text-left text-black bg-white rounded-lg">
          <div className="invoice-details">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h4 className="text-black text-[24px] font-semibold">{invoice?.billNo}</h4>
                </div>
                <div className="mt-[40px]">
                  <h6 className="text-[#999999] text-[14px]">
                    {t("issueDate")}
                  </h6>
                  <p className="text-[14px] mt-[4px]">
                    {moment(invoice?.createdOn).format("MM-DD-YYYY HH:mm:ss")}
                  </p>
                </div>
                <div className="mt-[20px]">
                  <h6 className="text-[#999999] text-[14px]">{t("dueDate")}</h6>
                  <p className="text-[14px] mt-[4px]">
                    {moment(invoice?.dueDate).format("MM-DD-YYYY HH:mm:ss")}
                    {moment(invoice?.dueDate).isSame(new Date(), "day")}{" "}
                    {moment(invoice?.dueDate).isSame(new Date(), "day") ? (
                      <span className="text-[#000000] inline-block">
                        Due Today
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-right">
                <div className="flex flex-col">
                  <div className="flex justify-end gap-2">
                    <h4 className="text-black text-[24px] flex items-center font-semibold">
                      Bill to
                    </h4>
                    <h4 className=" text-[24px] flex items-center font-semibold">
                      <img
                        src={brand.base64Logo}
                        alt=""
                        className="w-12 mr-2 height-12 filter brightness-0"
                      />
                      Company Name
                    </h4>
                  </div>
                  <div className="text-right">
                    <a
                      href="https://client.myreliablesite.m2mbeta.com"
                      className="text-black"
                    >
                      Company Name
                    </a>
                  </div>
                </div>
                <div className="flex mt-[12px] justify-end gap-4">
                  <div>
                    <h6 className="text-[#999999] text-[14px]">
                      {t("address")}
                    </h6>
                    <p className="font-medium text-[14px] mt-[4px]">
                      130 Birch Hill Court Beverly, MA 01915
                    </p>
                  </div>
                  <div>
                    <h6 className="text-[#999999] text-[14px]">
                      {t("fullName")}
                    </h6>
                    <p className="font-medium text-[14px] mt-[4px]">Paul Elliott</p>
                  </div>
                </div>
                <div className="flex mt-[40px] justify-end gap-4">
                  <div>
                    <h6 className="text-[#999999] text-[14px]">{t("email")}</h6>
                    <p className="font-medium text-[14px] mt-[4px]">
                      Paul.Elliott@fakemail.com
                    </p>
                  </div>
                  <div>
                    <h6 className="text-[#999999] text-[14px]">
                      {t("phoneNumber")}
                    </h6>
                    <p className="font-medium text-[14px] mt-[4px]">920-727-5502</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[40px]">
              <div className="flex items-center justify-between">
                <h6 className="text-[#000000] text-[12px] uppercase font-semibold">
                  Sample Product 1
                </h6>
                <h6 className="text-[#999999] text-[12px] uppercase">
                  {t("amount")}
                </h6>
              </div>
              <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
              {invoice?.orderProductLineItems?.map((data, i) => (
                <>
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <h6 className=" text-[14px]">
                        <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#F64E60] mr-[5px]"></span>
                        {data?.lineItem}
                      </h6>
                      <h6 className=" text-[14px]">${data?.price}</h6>
                    </div>
                    <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
                  </div>
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <h6 className=" text-[14px]">
                        <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#0BB783] mr-[5px]"></span>
                        {data?.lineItem}
                      </h6>
                      <h6 className=" text-[14px]">${data?.price}</h6>
                    </div>
                    <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
                  </div>
                </>
              ))}

              <div className="flex items-center justify-between">
                <h6 className="text-[#000000] text-[12px] uppercase font-semibold">
                  Sample Product 2
                </h6>
                <h6 className="text-[#999999] text-[12px] uppercase">
                  {t("amount")}
                </h6>
              </div>
              <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
              {invoice?.orderProductLineItems?.map((data, i) => (
                <>
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <h6 className=" text-[14px]">
                        <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#F64E60] mr-[5px]"></span>
                        {data?.lineItem}
                      </h6>
                      <h6 className=" text-[14px]">${data?.price}</h6>
                    </div>
                    <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
                  </div>
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <h6 className=" text-[14px]">
                        <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#0BB783] mr-[5px]"></span>
                        {data?.lineItem}
                      </h6>
                      <h6 className=" text-[14px]">${data?.price}</h6>
                    </div>
                    <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
                  </div>
                </>
              ))}

              <div className="flex items-center justify-between">
                <h6 className="text-[14px]">
                  <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                  {t("subTotal")}
                </h6>
                <h6 className="text-[14px]">${invoice?.subTotal}</h6>
              </div>
              <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
              <div className="flex items-center justify-between">
                <h6 className="text-[14px]">
                  <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                  {t("vat")}
                </h6>
                <h6 className=" text-[14px]">${invoice?.vat}</h6>
              </div>
              <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
              <div className="flex items-center justify-between">
                <h6 className="text-[14px]">
                  <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                  {t("Total")}
                </h6>
                <h6 className=" text-[14px]">${invoice?.totalPrice}</h6>
              </div>
              <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
