import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

const LineItem = ({ item }) => {
  return (
    <div className="border-b-[1px] border-b-[#323248] border-dashed pb-[16px] pt-[16px] flex items-center justify-between">
      <div className="flex gap-[16px]">
        <div className="h-[52px] w-[3px] bg-[#8950FC] rounded-[8px]" />
        <div>
          <div className="text-white text-[16px] font-normal">
            {item?.lineItem}
          </div>
          <div className="text-[#474761] text-[14px] font-normal">
            ${item?.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LineItems = ({ isView }) => {
  const [total, setTotal] = useState(0);
  const { values } = useFormikContext();

  useEffect(() => {
    let sum = 0;
    values?.productLineItems?.length > 0 &&
      values?.productLineItems?.forEach((item) => {
        sum += item?.price;
      });
    setTotal(sum);
  }, [values?.productLineItems]);

  return (
    <>
      <div className="bg-[#1E1E2D] p-[32px] rounded-[8px] mt-[20px]">
        <div className="flex items-center justify-between mb-[16px]">
          <h6 className="text-white text-[20px]">Line Items and Price</h6>

        </div>
        {values?.productLineItems?.length > 0 &&
          values?.productLineItems?.map((item, idx) => {
            if (!item?.isDeleted) {
              return (
                <LineItem
                  key={`item-${idx}`}
                  item={item}
                />
              );
            } else {
              return null;
            }
          })}
        <div className="mt-[32px] rounded-[8px] border-[#3699FF] border-[1px] border-dashed bg-[#212E48] flex items-center justify-between p-[32px]">
          <div className="text-white text-[20px] font-medium">
            Total - ${total.toFixed(2)}
          </div>
          <div className="text-[#3699FF] text-[14px]">
            {values?.paymentType === 0 ? "One Time Payment" : "Payment"}
          </div>
        </div>
      </div>
    </>
  );
};