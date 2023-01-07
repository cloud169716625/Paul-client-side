import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BillList, BillViewPDF, BillDownload } from 'modules';

import './Billing.styles.scss'

function Billing() {
  return (
    <Routes>
      <Route path="/" element={<BillList />} />
      <Route path="/detail/:id" element={<BillViewPDF />} />
      <Route path="/download/:id" element={<BillDownload />} />
      <Route path="*" element={<>404</>} />
    </Routes>
  );
}
export default Billing;
