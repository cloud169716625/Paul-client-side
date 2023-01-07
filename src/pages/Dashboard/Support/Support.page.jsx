import { Navigate, Route, Routes } from 'react-router-dom';
import KnowledgeBase from '../KnowledgeBase/KnowledgeBase.page';
import { SupportTickets, SupportTicketDetails } from 'modules';

function Support () {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/client/dashboard/support/ticket-details" />}
      />
      <Route
        path='/knowledge-base/*'
        element={<KnowledgeBase />}
      />
      <Route
        path='/tickets/*'
        element={<SupportTickets />}
      />
      <Route
        path='/ticket-details/*'
        element={<SupportTicketDetails />}
      />
    </Routes>
  );
}

export default Support;