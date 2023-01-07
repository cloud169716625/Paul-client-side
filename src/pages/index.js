import { lazy } from 'react';

export const dashboardPages = [
  {
    path: "/",
    Component: lazy(() => import("./Dashboard/Home/Home.page")),
  },
  {
    path: "/about",
    Component: lazy(() => import("./Dashboard/About/About.page")),
  },
  {
    path: "/editor",
    Component: lazy(() => import("./Dashboard/Editor/Editor.page")),
  },
  {
    path: "/account-settings/*",
    Component: lazy(() => import("./Dashboard/AccountSettings/AccountSettings.page")),
  },
  {
    path: '/billing/*',
    Component: lazy(() => import('./Dashboard/Billing/Billing.page')),
  },
  {
    path: "/products/*",
    Component: lazy(() => import("./Dashboard/ProductService/ProductService.page")),
  },
  {
    path: "/orders/*",
    Component: lazy(() => import("./Dashboard/Orders/Orders.page")),
  },
  {
    path: "/support/*",
    Component: lazy(() =>
      import("./Dashboard/Support/Support.page")
    ),
  },
];

export const Error404 = lazy(() => import('./error-404/Error404.page'));
