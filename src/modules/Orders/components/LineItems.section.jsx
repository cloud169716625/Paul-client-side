import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

const LineItem = ({ item }) => {
  return (
    <div className="border-b-[1px] border-b-[#323248] border-dashed pb-[16px] pt-[16px] flex items-center justify-between">
      <div className="flex gap-[16px]">
        <div className="w-[3px] bg-[#8950FC] rounded-[8px]" />
        <div>
          <div className="text-white text-[16px] font-normal">
            {item?.lineItem}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[12px]">
        <div className="text-[#474761] text-[14px] font-normal">
          ${item?.price}
        </div>
      </div>
    </div>
  );
};

export const LineItems = () => {
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
        {values?.productLineItems?.length > 0 &&
          values?.productLineItems?.map((item, idx) => {
            if (!item?.isDeleted) {
              return <LineItem key={`item-${idx}`} item={item} />;
            } else {
              return null;
            }
          })}
        <div className="mt-[32px] rounded-[8px] border-[#3699FF] border-[1px] border-dashed bg-[#212E48] flex items-center justify-between p-[20px]">
          <div className="text-white text-[16px] font-medium">
            Total - ${total.toFixed(2)}
          </div>
          <div className="text-[#3699FF] text-[14px]">
            {values?.paymentType === 0 ? "One Time Payment" : "Payment"}
          </div>
        </div>

        <div className="mt-[32px] border-dashed items-center">
          <h4 className="text-white text-[14px] mb-[16px]">Order Notes</h4>
          <p className="w-full min-h-[52px] rounded-[8px] bg-[#323248] p-[16px] text-white">
            {values.notes}
          </p>
        </div>
      </div>
    </>
  );
};
