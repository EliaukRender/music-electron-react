import { RouteObject } from 'react-router-dom';
import React, { Suspense } from 'react';

const Layout = React.lazy(() => import('@/renderer/views/Layout/index'));
const SheetCommon = React.lazy(
  () => import('@/renderer/views/SheetCommon/SheetCommon'),
);
const MiniPlayer = React.lazy(
  () => import('@/renderer/views/MiniPlayer/MiniPlayer'),
);
const MusicHome = React.lazy(
  () => import('@/renderer/views/MusicHome/MusicHome'),
);
const MusicVideo = React.lazy(
  () => import('@/renderer/views/MusicVideo/MusicVideo'),
);
const MusicWorld = React.lazy(
  () => import('@/renderer/views/MusicWorld/MusicWorld'),
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
        path: 'like',
        element: <SheetCommon></SheetCommon>,
      },
      {
        path: 'home',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MusicHome></MusicHome>{' '}
          </Suspense>
        ),
      },
      {
        path: 'video',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MusicVideo></MusicVideo>
          </Suspense>
        ),
      },
      {
        path: 'world',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MusicWorld></MusicWorld>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: 'mini-player',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MiniPlayer />
      </Suspense>
    ),
  },
];

export default routes;
