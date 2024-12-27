import { Navigate, RouteObject } from 'react-router-dom';
import React from 'react';

const Layout = React.lazy(() => import('@/renderer/views/Layout/index'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/index"></Navigate>,
  },
  {
    path: '/index',
    element: <Layout></Layout>,
  },
];

export default routes;
