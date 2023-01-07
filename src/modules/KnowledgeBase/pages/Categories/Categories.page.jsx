import { Route, Routes } from 'react-router-dom';
// import { List } from './pages';
import { List } from './pages/List/List.page';

const Categories = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      {/* <Route index element={<ChildCategoryList />} /> */}
    </Routes>
  );
};

export default Categories;
