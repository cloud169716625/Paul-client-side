import Articles from './Articles/Articles.page';
// import UserSubmissions from './UserSubmissions/UserSubmissions.page';
import Categories from './Categories/Categories.page';

export const pages = [
  { path: '/articles/*', Component: Articles },
  // { path: '/user-submissions/*', Component: UserSubmissions },
  { path: '/categories/*', Component: Categories },
];