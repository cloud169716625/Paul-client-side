import { Route, Routes } from 'react-router-dom';
import { List } from './pages/List/List.page';
import { FeedbackDetails } from './pages/FeedbackDetails/FeedbackDetails.page';

const Feedback = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="view/:id" element={<FeedbackDetails />} />
    </Routes>
  );
};

export default Feedback;
