import { Route, Routes } from 'react-router-dom';
import { SubmissionDetails, List } from './pages';

const UserSubmissions = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="view/:id" element={<SubmissionDetails />} />
    </Routes>
  );
};

export default UserSubmissions;
