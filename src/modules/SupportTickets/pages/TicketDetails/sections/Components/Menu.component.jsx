import React from "react";
// import { Icon } from 'antd';
import "./index.scss";

const Popup = ({ record, x, y }) => {
  const onMergeClick = ({ ticket }) => {
    // console.log(ticket);
  };

  return (
    <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      <li onClick={() => onMergeClick({ ticket: record })}>Merge</li>
      <li>Transfer</li>
      <li>Status</li>
      <li>Follow-Up</li>
      <li>Priority</li>
      <li>Pin</li>
    </ul>
  );
};

export default Popup;
