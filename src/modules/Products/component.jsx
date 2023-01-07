import { Route, Routes, Navigate } from "react-router-dom";
import { ProductList, ProductDetail, CancellationRequests } from "./sections";
import { InvoiceHistory, Overview } from "./sections/ProductDetail/sections";
import { InvoiceDetail, InvoiceList } from "./sections/ProductDetail/sections/InvoiceHistory/sub-sections";

export function Products() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/client/dashboard/products/list/show" />}
      />
      <Route path="list/show" element={<ProductList />} />
      <Route path="active" element={<ProductList productListStatus={"active"} />} />
      <Route path="suspended" element={<ProductList productListStatus={"suspended"} />} />
      <Route path="pending" element={<ProductList productListStatus={"pending"} />} />
      <Route path="cancelled" element={<ProductList productListStatus={"cancelled"} />} />
      <Route path="list" element={<ProductDetail />}>
        <Route path="overview/:id" element={<Overview />} />
        <Route path="invoice" element={<InvoiceHistory />} >
          <Route path="list/:id" element={<InvoiceList />} />
          <Route path="details/:id/:invoiceId" element={<InvoiceDetail />} />
        </Route>
      </Route>
      <Route
        path="cancellation/requests"
        element={<CancellationRequests />}
      />
    </Routes>
  );
}