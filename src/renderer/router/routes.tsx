import { RouteObject } from 'react-router-dom';
import React, { Suspense } from 'react';

const Layout = React.lazy(() => import('@/renderer/views/Layout/index'));
const SheetCommon = React.lazy(
  () => import('@/renderer/views/SheetCommon/SheetCommon'),
);

const routes: RouteObject[] = [
  {
    path: '/*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: 'sheet',
        element: <SheetCommon></SheetCommon>,
      },
    ],
  },
];

export default routes;
