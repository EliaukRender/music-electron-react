import { Navigate, RouteObject } from 'react-router-dom';
import React from 'react';

const Home = React.lazy(() => import('../views/Home'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home"></Navigate>,
  },
  {
    path: '/home',
    element: <Home></Home>,
  },
];

export default routes;
