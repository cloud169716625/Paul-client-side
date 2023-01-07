import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getCurrentOnlineUsers, getDepartments } from "store";
import AdvancedSearch from "modules/KnowledgeBase/pages/Articles/pages/View/sections/AdvancedSearch/AdvancedSearch";
import GenerateNewTicket from "components/GenerateTicket/GenerateNewTicket";
import { TicketDetails } from "./pages";
import "./style.scss";

export const SupportTickets = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getCurrentOnlineUsers());
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/client/dashboard/support/tickets/list" />}
      />
      <Route
        path="list"
        element={<AdvancedSearch />} 
      />
      <Route
        path="details/:id"
        element={<TicketDetails />}
      />
      <Route
        path="generate-ticket"
        element={<GenerateNewTicket />}
        exact
      />
    </Routes>
  );
};
