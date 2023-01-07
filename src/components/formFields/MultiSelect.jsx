import { Select } from "antd";
import { Field } from "formik";
import "./style.scss";

export const MultiSelect = ({
  name,
  label,
  disabled,
  placeholder,
  options,
  mode = "multiple",
  onChange,
  className,
  popupClassName,
}) => {
  return (
    <Field name={name}>
      {({ meta, form: { setFieldValue, setFieldTouched } }) => {
        return (
          <div className="w-full custom-select-component">
            {label ? (
              <label
                htmlFor={name}
                className="mb-[16px] text-white text-[14px] mt-2"
              >
                {label}
              </label>
            ) : null}
            <Select
              disabled={disabled}
              mode={mode}
              style={{ width: "100%" }}
              placeholder={placeholder}
              className={`custom-select ${className}`}
              popupClassName={`custom-select__dropdown ${popupClassName}`}
              filterOption = {(input, option) => {
                return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }}
              options={options}
              dropdownStyle={{
                zIndex: 999999999,
              }}
              value={meta?.value}
              onChange={(value, option) => {
                setFieldValue(name, value);
                if (onChange) {
                  onChange(value, option);
                }
              }}
              onBlur={() => {
                setFieldTouched(name, true);
              }}
            />
            {meta?.touched && Array.isArray(meta?.error) ? (
              <>
                {meta.error.map((err, index) => (
                  <div key={`error-tag-${index}`} className="error">
                    {err}
                  </div>
                ))}
              </>
            ) : meta?.touched && meta?.error ? (
              <div className="error">{meta?.error}</div>
            ) : null}
          </div>
        );
      }}
    </Field>
  );
};
