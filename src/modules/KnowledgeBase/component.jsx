import { Navigate, Route, Routes } from 'react-router-dom';
import { pages } from './pages';
import './style.scss';

export function KnowledgeBase() {
  return (
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/client/dashboard/support/knowledge-base/articles" />}
        />
        {pages?.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
  );
}