import { Button as $Button } from 'antd';
import './Button.styles.scss';

const getButtonStyles = (type) => {
  switch (type) {
    case 'secondary':
      return 'bg-[#323248] hover:bg-[#323248] focus:bg-[#323248] text-white';
    case 'ghost':
      return 'bg-[#212E48] hover:bg-[#212E48] focus:bg-[#212E48] text-[#3699FF]';
    case 'delete':
      return 'bg-[#3A2434] hover:bg-[#3A2434] focus:bg-[#3A2434] text-[#F64E60] hover:text-[#F64E60]';
    case 'deactivate':
      return 'bg-[#392F28] hover:bg-[#392F28] focus:bg-[#392F28] text-[#FFA800] hover:text-[#FFA800]';
    case 'activate':
      return 'bg-[#1C3238] hover:bg-[#1C3238] focus:bg-[#1C3238] text-[#0BB783] hover:text-[#0BB783]';
    default:
      return 'bg-[#3699FF] hover:bg-[#3699FF] focus:bg-[#3699FF] text-white';
  }
};

export const Button = ({
  type,
  children,
  htmlType,
  onClick,
  className,
  disabled,
  loading,
}) => {
  return (
    <$Button
      disabled={disabled}
      htmlType={htmlType}
      onClick={onClick}
      loading={loading}
      className={`rounded-[8px] h-[44px] border-none px-[24px] py-[12px] ${getButtonStyles(
        type
      )} ${className} ${disabled && 'custom-button-disabled'}`}
    >
      {children}
    </$Button>
  );
};
