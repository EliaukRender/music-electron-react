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
const CherryPick = React.lazy(
  () => import('@/renderer/views/MusicHome/views/CherryPick'),
);
const HomeRank = React.lazy(
  () => import('@/renderer/views/MusicHome/views/HomeRank'),
);
const HomeSinger = React.lazy(
  () => import('@/renderer/views/MusicHome/views/HomeSinger'),
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
      // 我的歌单
      {
        path: 'like',
        element: <SheetCommon></SheetCommon>,
      },
      // 音乐馆
      {
        path: 'home/*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MusicHome></MusicHome>{' '}
          </Suspense>
        ),
        children: [
          // 音乐馆-精选
          {
            path: 'cherryPickCmp',
            element: (
              <Suspense>
                <CherryPick></CherryPick>
              </Suspense>
            ),
          },
          // 音乐馆-排行
          {
            path: 'rank',
            element: (
              <Suspense>
                <HomeRank></HomeRank>
              </Suspense>
            ),
          },
          // 音乐馆-歌手
          {
            path: 'singer',
            element: (
              <Suspense>
                <HomeSinger></HomeSinger>
              </Suspense>
            ),
          },
        ],
      },
      // 视频
      {
        path: 'video',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MusicVideo></MusicVideo>
          </Suspense>
        ),
      },
      // 世界
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
