import { DatePicker as $DatePicker } from 'antd';
import { Field } from 'formik';
import './style.scss';

export const DateRangePicker = ({
  name,
  disableDate,
  disableTime,
  onChange,
}) => {
  return (
    <Field name={name}>
      {({ field, meta, form: { values, setFieldValue } }) => (
        <div className="w-full">
          <$DatePicker.RangePicker
            onChange={(date) => {
              setFieldValue(name, date);
              if (onChange) {
                onChange(date);
              }
            }}
            value={values[name]}
            popupClassName="custom-date-picker-dd"
            format="MM/DD/YYYY"
            separator={<></>}
            className="custom-date-picker w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px]"
          />
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};
