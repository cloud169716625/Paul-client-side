import { useState } from 'react';
import { AccountSummary, Navigation, Statement } from './sections';

export const BillList = () => {
  const [active, setActive] = useState("ACCOUNT SUMMARY");

  const links = [
    { label: "ACCOUNT SUMMARY", onClick: () => setActive("ACCOUNT SUMMARY") },
    { label: "STATEMENT", onClick: () => setActive("STATEMENT") },
  ];

  return (
    <div className="flex flex-col flex-grow p-[24px] md:p-10 gap-[12px] md:gap-[40px]">
      <Navigation links={links} active={active} />
      {active === "ACCOUNT SUMMARY" ? <AccountSummary /> : <></>}
      {active === "STATEMENT" ? <Statement /> : <></>}
    </div>
  );
};
