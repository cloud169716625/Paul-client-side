import { Field, useFormikContext } from "formik";
import { useRef } from "react";
import "./formFields/style.scss";
import moment from "moment";
import { useSelector } from "react-redux";

export const ThumbnailEdit = ({ name, disabled }) => {
  const inputRef = useRef(null);
  const {product} =useSelector((state) => state?.products)
  const { values, setFieldValue } = useFormikContext();
  const productStatus = (status) => {
    let text = "";
    switch (status) {
      case 0:
        text = "Pending";
        break;
      case 1:
        text = "Active";
        break;
      case 2:
        text = "Cancelled";
        break;
      case 3:
        text = "PROCESSING";
        break;
      case 4:
        text = "COMPLETED";
        break;
      case 5:
        text = "ACCEPTED";
        break;
      case 6:
        text = "CANCELLED";
        break;
      default:
        text = "UNKNOWN";
    }
    return (
      <div className="text-[14px] font-medium text-[#92928F]">
        {text}
      </div>
    );
  }

  const Options = [
    { label: "Hourly", value: 0 },
    { label: "Monthly", value: 1 },
    { label: "Quarterly", value: 2 },
    { label: "SemiAnnually", value: 3 },
    { label: "Annually", value: 4 },
    { label: "Biennially", value: 5 },
    { label: "Triennially", value: 6 },
  ];

  const productBillingCycle = (billingCycle) => {
    let value = "";
    switch (billingCycle) {
      case 0:
        value = Options[0]?.label;
        break;
      case 1:
        value = Options[1]?.label;
        break;
      case 2:
        value = Options[2]?.label;
        break;
      case 3:
        value = Options[3]?.label;
        break;
      case 4:
        value = Options[4]?.label;
        break;
      case 5:
        value = Options[5]?.label;
        break;
      case 6:
        value = Options[6]?.label;
        break;

      default:
        value = "UNKNOWN";
    }
    return `${value}`;
  }

  return (
    <Field name={name} className="image-upload">
      {({ meta, form: { setFieldValue, values } }) => (
        <>
          <div className="p-[32px] bg-[#1E1E2D] rounded-[8px]">
            <div className="bg-[#3A2434] w-full h-[200px] rounded-[8px] mt-[32px] flex items-center relative cursor-pointer">
              <div
                className="relative shadow-xl rounded-[50%] h-[54px] w-[54px] flex items-center justify-center ml-[auto] mr-[auto]"
                onClick={() => inputRef.current.click()}
              >
                <img src="/img/bulk-flash-circle.svg" alt="edit-icon" />
              </div>
              {values?.preview ? (
                <img
                  src={values?.preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-[8px]"
                />
              ) : null}
            </div>
            <div className="flex items-center justify-between pt-[20px]">
              <h6 className="text-white text-[16px] mb-0">Service Status</h6>
            </div>
            <div className="mt-[12px] mb-[40px] rounded-[8px] border-[#323248] border-[1px] border-dashed flex items-center justify-between p-[12px]">
              {productStatus(values?.status)}
            </div>
            <div className="pb-[20px] pt-[15px] flex items-center justify-between">
              <div>
                <p className="text-white text-[14px]">Payment Type</p>
              </div>
              <div>
                <p className="text-[#92928F] text-[14px]">{values?.paymentType}</p>
              </div>
            </div>
            <hr
              className="w-full border-t-[2px] border-t-[#474761] border-dashed mb-[20px]"
              style={{ height: "0px" }}
            />
            <div className="pb-[20px] pt-[15px] flex items-center justify-between">
              <div>
                <p className="text-white text-[14px]">Billing Cycle</p>
              </div>
              <div>
                <p className="text-[#92928F] text-[14px]"> {productBillingCycle(values?.billingCycle)}</p>
              </div>
            </div>
            <hr
              className="w-full border-t-[2px] border-t-[#474761] border-dashed mb-[20px]"
              style={{ height: "0px" }}
            />
            <div className="pb-[20px] pt-[15px] flex items-center justify-between">
              <div>
                <p className="text-white text-[14px]">Registration Date</p>
              </div>
              <div>
                <p className="text-[#92928F] text-[14px] text-end">{values?.registrationDate && values?.registrationDate !== "N/A" ? moment(values?.registrationDate).format('MMMM Do, YYYY') : "N/A"}</p>
              </div>
            </div>
            <hr
              className="w-full border-t-[2px] border-t-[#474761] border-dashed mb-[20px]"
              style={{ height: "0px" }}
            />
            <div className="pb-[20px] pt-[15px] flex items-center justify-between">
              <div>
                <p className="text-white text-[14px]">Cancelled Date</p>
              </div>
              <div>
                <p className="text-[#92928F] text-[14px] text-end">{product?.terminationDate && product?.terminationDate !== "N/A" ? moment(values?.terminationDate).format('MMMM Do, YYYY') : "N/A"}</p>
              </div>
            </div>
            <hr
              className="w-full border-t-[2px] border-t-[#474761] border-dashed mb-[20px]"
              style={{ height: "0px" }}
            />
            <div className="pb-[20px] pt-[15px] flex items-center justify-between">
              <div>
                <p className="text-white text-[14px]">Next Renewal</p>
              </div>
              <div>
                <p className="text-[#92928F] text-[14px]">{values?.nextDueDate && values?.nextDueDate !== "N/A" ? moment(values?.nextDueDate).format('MMMM Do, YYYY') : "N/A"}</p>
              </div>
            </div>
            <hr
              className="w-full border-t-[2px] border-t-[#474761] border-dashed mb-[20px]"
              style={{ height: "0px" }}
            />
            <div className="pb-[20px] pt-[15px] flex items-center justify-between">
              <div>
                <p className="text-white text-[14px]">Payment Method</p>
              </div>
              <div>
                <p className="text-[#92928F] text-[14px]">Credit Card</p>
              </div>
            </div>
            <hr
              className="w-full border-t-[2px] border-t-[#474761] border-dashed mb-[20px]"
              style={{ height: "0px" }}
            />
          </div>
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  );
};