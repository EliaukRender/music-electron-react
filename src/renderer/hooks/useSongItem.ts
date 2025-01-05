import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { playSong } from '@/renderer/store/actions/audioPlayerActions';
import { useDoubleClick } from '@/renderer/hooks/useDoubleClick';

/**
 * @description: 歌曲列表中的  1、某一首歌的鼠标进入、离开的动画；  2、双击播放控制操作
 */
export const useSongItem = ({
  songInfo,
  activeSongId,
  index,
}: {
  songInfo: any;
  activeSongId: number;
  index: number;
}) => {
  const { isPlaying } = useSelector(
    (state: RootState) => ({
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );

  // 当前歌曲是否被选中激活
  const isActiveSong = useMemo(() => {
    return activeSongId === songInfo.songId;
  }, [activeSongId, songInfo]);

  // song-item的操作按钮区域、缩略图遮罩的clsss类名
  const classList = useMemo(() => {
    return [`.operation-group-${index}`, `.music-info-${index} .img-mask`];
  }, [index]);

  // 初始化css样式
  const initNonVisible = useCallback(() => {
    gsap.set(classList, {
      opacity: 0,
    });
  }, [classList]);

  const initVisible = useCallback(() => {
    gsap.set(classList, {
      opacity: 1,
    });
  }, [classList]);

  // 鼠标进入时的song-item的动画效果
  const showAnimation = useCallback(() => {
    gsap.to(classList, { opacity: 1, duration: 0.2 });
  }, [classList]);

  // 鼠标离开时的song-item的动画效果
  const hiddenAnimation = useCallback(() => {
    if (isActiveSong) return;
    gsap.to(classList, { opacity: 0, duration: 0.2 });
  }, [isActiveSong, classList]);

  /**
   * 初始化样式
   */
  useEffect(() => {
    if (isActiveSong) {
      initVisible();
    } else {
      initNonVisible();
    }
  }, [initNonVisible, initVisible, isActiveSong]);

  /**
   * 双击播放歌曲
   */
  const songItemRef = useRef<HTMLDivElement | null>(null);
  const handleDoubleClick = useCallback(() => {
    if (isActiveSong) {
      !isPlaying && playSong();
    } else {
      playSong(songInfo);
    }
  }, [songInfo, isActiveSong, isPlaying]);
  useDoubleClick(songItemRef, handleDoubleClick); // 双击

  return {
    isPlaying,
    songItemRef,
    isActiveSong,
    hiddenAnimation,
    showAnimation,
  };
};
