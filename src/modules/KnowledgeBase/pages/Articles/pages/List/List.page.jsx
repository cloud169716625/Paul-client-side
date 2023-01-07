import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import {
  Navigation,
  PublicArticles,
  Categories,
  Submissions,
} from './sections';

const navData = [
  { label: 'Public Articles', path: 'public-articles' },
];

export const List = () => {
  const [current, setCurrent] = useState('public-articles');

  return (
    <div className="p-[40px]">
      <Navigation current={current} setCurrent={setCurrent} navData={navData} />
      <div className='title-navX'>{"Popular & Latest Articles"}</div>
      <PublicArticles />
      <div className='title-navX'>{"Categories"}</div>
      <Categories />
      <div className='title-navX'>{"Submissions"}</div>
      <Submissions />
    </div>
  );
};
