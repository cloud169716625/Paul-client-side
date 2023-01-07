import { DatePicker as $DatePicker } from "antd";
import { Field } from "formik";
import "./style.scss";

export const DatePicker = ({
  name,
  disableDate,
  disableTime,
  hideTime,
  format,
  disabled,
}) => {
  return (
    <Field name={name}>
      {({ field, meta, form: { values, setFieldValue } }) => (
        <div className="w-full">
          <$DatePicker
            onChange={(date) => setFieldValue(name, date)}
            value={values[name]}
            popupClassName="custom-date-picker-dd"
            showTime={hideTime ? false : { format: "HH:mm A" }}
            disabledDate={disableDate}
            disabledTime={disableTime}
            disabled={disabled}
            format={format || "dddd, MMM Do, YYYY [at] h:mm A z"}
            className="custom-date-picker w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px] "
          />
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};
