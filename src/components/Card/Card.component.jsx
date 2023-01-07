import { Spin } from 'antd';

import './Card.styles.scss';

export const Card = ({ heading, children, className, loading = false }) => {
  return (
    <Spin spinning={loading}>
      <div className={`bg-[#1E1E2D] rounded-[8px] ${className}`}>
        {/* Card Heading */}
        <div className="p-[32px] text-[16px] text-white">{heading}</div>
        {/* Card Divider */}
        <hr className="border-t-[#92928f] border-dashed custom-card__divider" />
        {/* Card Body */}
        <div className="p-[32px]">{children}</div>
      </div>
    </Spin>
  );
};
