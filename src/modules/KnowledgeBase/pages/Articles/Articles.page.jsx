import { Route, Routes } from 'react-router-dom';
import { List } from './pages/List/List.page';
import { Add } from './pages/Add/Add.page';
import { View } from './pages/View/View.page';
import { AddComment } from './pages/Comments/AddComment';
import { AllArticles } from './pages';
import { Edit } from './pages/Add/Edit.page';
// import { Add, Edit, List, View } from './pages';

const Articles = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="add/new" element={<Add />} />
      <Route path="view/:id" element={<View />} />
      <Route path="edit/:id" element={<Edit />} />
      <Route path="comment/:id" element={<AddComment />} />
      <Route path="all-articles" element={<AllArticles />} />

    </Routes>
  );
};

export default Articles;
