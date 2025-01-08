import { useEffect, useMemo, useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';

/**
 * @description: 被激活的歌曲 自动滚动到 可视区域
 * @param isSheet 歌曲列表的场景
 * @param isActiveVisible 播放队列弹窗动画结束标志
 */
export const useScrollSongVisible = (
  isSheet = false,
  isActiveVisible = false,
) => {
  const { curSheetSongList, activeSongId, activeSongList } = useSelector(
    (state: RootState) => ({
      activeSongId: state.playerControl.activeSongId,
      curSheetSongList: state.mainMenu.curSheetSongList,
      activeSongList: state.playerControl.activeSongList,
    }),
    shallowEqual,
  );
  const songRefs = useRef<(HTMLDivElement | null)[]>([]); // 歌曲的ref列表

  // 歌曲列表中的index
  const curIndexForSheet = useMemo(() => {
    return curSheetSongList.findIndex((item) => item.songId === activeSongId);
  }, [activeSongId, curSheetSongList]);

  // 播放队列中的index
  const curIndexForActive = useMemo(() => {
    return activeSongList.findIndex((item) => item.songId === activeSongId);
  }, [activeSongId, activeSongList]);

  // 满足场景则需要自动滚动
  useEffect(() => {
    if (curIndexForSheet !== -1 && isSheet) {
      const index = curSheetSongList.findIndex(
        (item) => item.songId === activeSongId,
      );
      songRefs.current[curIndexForSheet]?.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
    }
    if (curIndexForActive !== -1 && isActiveVisible) {
      songRefs.current[curIndexForActive]?.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
    }
  }, [
    activeSongId,
    activeSongList,
    curIndexForActive,
    curIndexForSheet,
    curSheetSongList,
    isActiveVisible,
    isSheet,
  ]);

  return {
    songRefs,
  };
};
