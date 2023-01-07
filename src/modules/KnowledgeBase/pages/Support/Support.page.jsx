import { Route, Routes } from 'react-router-dom';
// import { List } from './pages';
import { ArticleList } from './pages/Articles/ArticleList.page';

const Support = () => {
  return (
    <Routes>
      <Route index element={<ArticleList />} />
    </Routes>
  );
};

export default Support;
