import { useEffect, useRef, useState } from 'react';

/**
 * @description: 正在播放的歌曲自动滚动到可视区域
 */
export const useScrollSongVisible = ({
  songList,
  activeSongId,
}: {
  songList: any[];
  activeSongId: number;
}) => {
  const songRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [curActiveSongEle, setCurActiveSongEle] =
    useState<HTMLDivElement | null>();

  useEffect(() => {
    const index = songList.findIndex(
      (item: any) => item.songId === activeSongId,
    );
    if (index !== -1 && songRefs.current[index]) {
      setCurActiveSongEle((prevState) => songRefs.current[index]);
    }
  }, [activeSongId, songList]);

  /**
   * 当前播放歌曲对应的element
   */
  useEffect(() => {
    const index = songList.findIndex(
      (item: any) => item.songId === activeSongId,
    );
    console.log('index', index);
    if (index !== -1 && songRefs.current[index]) {
      setCurActiveSongEle((prevState) => songRefs.current[index]);
    }
  }, [activeSongId, songList]); // 当 currentSongId 变化时触发滚动

  /**
   * 监听当前播放歌曲对应的element的可见性
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 只要不是完全可见就自动滚动
        if (!entry.isIntersecting || entry.intersectionRatio !== 1) {
          curActiveSongEle?.scrollIntoView({
            behavior: 'instant',
            block: 'center',
          });
        }
      },
      {
        threshold: 1.0,
      },
    );

    if (curActiveSongEle) {
      observer.observe(curActiveSongEle);
    }

    return () => {
      if (curActiveSongEle) {
        observer.unobserve(curActiveSongEle);
      }
    };
  }, [curActiveSongEle]);

  return {
    songRefs,
  };
};
