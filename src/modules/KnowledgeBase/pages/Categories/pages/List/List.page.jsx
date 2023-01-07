import { useState } from 'react';
import { ChildCategoryList } from '../ChildCategory';
import { CategoryList } from '../ParentCategory';
import { Navigation } from './sections';

const navData = [
  { label: 'PARENT CATEGORY', path: 'parent-category' },
  { label: 'CHILD CATEGORY', path: 'child-category' },
];

export const List = () => {
  const [current, setCurrent] = useState('parent-category');

  const getCurrentScreen = () => {
    switch (current) {
      case 'parent-category':
        return <CategoryList />;
      case 'child-category':
        return <ChildCategoryList />;
      default:
        return <CategoryList />;
    }
  };

  return (
    <div className="p-[40px]">
      {/* Navigation */}
      <Navigation current={current} setCurrent={setCurrent} navData={navData} />
      {/* Current Active Screen */}
      {getCurrentScreen()}
    </div>
  );
};
