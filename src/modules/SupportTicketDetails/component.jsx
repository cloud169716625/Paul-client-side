import { Navigate, Route, Routes } from "react-router-dom"; 
import { Details } from './pages'
import "./style.scss";

export const SupportTicketDetails = () => { 

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/client/dashboard/support/ticket-details/detail" />}
      />
      <Route
        path="detail"
        element={<Details />} 
      />
    </Routes>
  );
};
