import { Field } from "formik";
import { Input as $Input, Switch } from "antd";
import "./input.scss";

const InputType = ({
  field,
  type,
  values,
  name,
  setFieldValue,
  placeholder,
  options,
  disabled,
  rows,
  customOnChange,
  ...props
}) => {
  switch (type) {
    case "switch":
      return (
        <div className="w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px]">
          <>{values[name] ? "Enabled" : "Disabled"}</>
          <Switch
            disabled={disabled}
            checked={values[name]}
            onChange={(e) => setFieldValue(name, e)}
          />
        </div>
      );
    case "select":
      const finalOptions = [{ label: placeholder, value: "" }, ...options];
      return (
        <select
          disabled={disabled}
          value={values[name]}
          onChange={(e) => {
            setFieldValue(name, e.target.value);
            if (customOnChange) {
              customOnChange(e);
            }
          }}
          className="form-select appearance-none text-[14px] block w-full px-[16px] h-[52px] text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none disabled:bg-[#323248] disabled:text-[#92928F]"
        >
          {finalOptions?.map((option) => (
            <option
              value={option?.value}
              key={option?.value}
              className={option?.isActive ? "isActive" : "offline"}
            >
              {option?.label}
            </option>
          ))}
        </select>
      );
    case "textarea":
      return (
        <textarea
          disabled={disabled}
          placeholder={placeholder}
          value={values[name]}
          rows={rows}
          onChange={(e) => setFieldValue(name, e.target.value)}
          className="appearance-none block w-full px-[16px] py-[16px] text-base font-normal text-[#92928f] placeholder:text-[#92928F] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none disabled:bg-[#323248] disabled:text-[#92928F]"
        />
      );
    default:
      return (
        <$Input
          {...field}
          className="w-full h-[52px] bg-[#171723] border-none rounded-[8px] placeholder:text-[#92928F] text-[#92928F] px-[16px] disabled:bg-[#323248] disabled:text-[#92928F]"
          placeholder={placeholder}
          value={values[name]}
          type={type}
          disabled={disabled}
          {...props}
        />
      );
  }
};

export const Input = ({
  name,
  placeholder,
  type,
  label,
  options,
  disabled,
  rows,
  className,
  customOnChange,
  ...props
}) => {
  return (
    <Field name={name}>
      {({ field, meta, form: { values, setFieldValue } }) => (
        <div className={`w-full ${className}`}>
          {label ? (
            <label htmlFor={name} className="mb-[16px] text-white text-[14px]">
              {label}
            </label>
          ) : null}
          <InputType
            type={type}
            field={field}
            values={values}
            name={name}
            setFieldValue={setFieldValue}
            placeholder={placeholder}
            options={options}
            disabled={disabled}
            rows={rows}
            customOnChange={customOnChange}
            {...props}
          />
          {meta.touched && meta.error && (
            <div className="error mt-[8px]">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
};
