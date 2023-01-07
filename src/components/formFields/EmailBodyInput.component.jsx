import { Field } from 'formik';
import { MultiSelect, Input, DatePicker, ImageUpload } from '.';

const getInputEl = ({ options, name, placeholder, type, darkBg }) => {
  switch (type) {
    case 'multiselect':
      return (
        <div
          className={`custom-multiselect-email-body-input ${
            darkBg ? 'darkBg' : ''
          } w-full`}
        >
          <MultiSelect
            name={name}
            options={options}
            mode="multiple"
            placeholder={placeholder}
          />
        </div>
      );
    case 'text':
      return (
        <Field
          name={name}
          placeholder={placeholder}
          className={`h-[52px] w-[60%] pl-[12px] text-[#92928f] placeholder:text-[#92928f] focus-visible:outline-none ${
            darkBg ? 'bg-[#171723]' : 'bg-[transparent]'
          }`}
        />
      );
    case 'number':
      return (
        <Field
          name={name}
          type="number"
          placeholder={placeholder}
          className={`h-[52px] w-[60%] pl-[12px] text-[#92928f] placeholder:text-[#92928f] focus-visible:outline-none ${
            darkBg ? 'bg-[#171723]' : 'bg-[transparent]'
          }`}
        />
      );
    case 'readOnly':
      return (
        <input
          placeholder={placeholder}
          className="h-[52px] w-[60%] text-[#92928f] pl-[12px] placeholder:text-[#92928f] bg-[transparent] focus-visible:outline-none"
          readOnly
        />
      );
    case 'select':
      return (
        <div className="custom-select-email-body-input w-full">
          <Input
            type={type}
            placeholder={placeholder}
            name={name}
            options={options}
          />
        </div>
      );
    case 'image':
      return (
        <div className="custom-select-kba w-full">
          <ImageUpload name={name} />
        </div>
      );
    case 'date':
      return <DatePicker name={name} />;
    default:
      break;
  }
};

export const EmailBodyInput = ({
  touched,
  errors,
  name,
  placeholder,
  label,
  options,
  type,
  darkBg,
}) => {
  return (
    <div 
      className={`grid grid-cols-[1fr_4fr] items-center ${
        darkBg
          ? 'bg-[#171723] border-b-[1px] border-b-[#323248] border-dashed'
          : 'bg-[#28283a]'
      }`}
    >
      <h6 className="pl-[32px] w-[20%] text-white whitespace-nowrap">
        {label}
      </h6>
      {getInputEl({ options, name, placeholder, type, darkBg })}
      {touched[name] && errors[name] && (
        <div className="error whitespace-nowrap mr-[12px] mt-[0px] w-[20%]">
          {errors[name]}
        </div>
      )}
    </div>
  );
};
