import React from 'react';

const DateInput = (props) => {
  return (
    <div className="relative inline">
      <input
        {...props}
        type="text"
        className={`w-full text-white p-[16px] pr-[56px] rounded-lg bg-custom-dark leading-5 text-normal`}
      />

      <img
        src={`/icon/dashboard/calendar.svg`}
        width={24}
        height={24}
        alt=""
        className="absolute top-[14px] right-[16px]"
      />
    </div>
  );
};

export default DateInput;
