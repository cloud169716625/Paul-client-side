import { Navigate, Route, Routes } from 'react-router-dom';
import KnowledgeBase from '../KnowledgeBase/KnowledgeBase.page';
import { SupportTickets } from 'modules';

function Support () {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/client/dashboard/support/knowledge-base" />}
      />
      <Route
        path='/knowledge-base/*'
        element={<KnowledgeBase />}
      />
      <Route
        path='/tickets/*'
        element={<SupportTickets />}
      />
    </Routes>
  );
}

export default Support;