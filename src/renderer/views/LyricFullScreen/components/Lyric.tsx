import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { LyricStyles } from '@/renderer/views/LyricFullScreen/styles/LyricStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { transformLyric } from '@/renderer/utils/lyric/transformLyric';
import { audio } from '@/renderer/store/actions/audioPlayerActions';
import { RootState } from '@/renderer/store';

/**
 * @description: 歌词
 */
const Lyric = () => {
  const { activeSongId, activeSongList } = useSelector(
    (state: RootState) => ({
      activeSongId: state.playerControl.activeSongId,
      activeSongList: state.playerControl.activeSongList,
    }),
    shallowEqual,
  );
  const [currentTime, setCurrentTime] = useState(0);
  const lyricBoxRef = useRef<HTMLDivElement | null>(null);
  const [oldIndex, setOldIndex] = useState(0);

  // 当前歌词列表
  const lyricList = useMemo(() => {
    const curSong = activeSongList.find((song) => song.songId === activeSongId);
    return transformLyric(curSong.lyric);
  }, [activeSongId, activeSongList]);

  /**
   * @description: 歌曲切换时更新歌词
   */
  useEffect(() => {
    const lyricBoxEle = lyricBoxRef.current as HTMLDivElement;
    const currentSong = activeSongList.find(
      (song) => song.activeSongId === activeSongId,
    );
    if (currentSong && lyricBoxEle) {
      setOldIndex(0); // 重置索引值
      // 清除动画效果
      const childrenList = lyricBoxEle.querySelectorAll('.lyric-text');
      childrenList.forEach((item: any) => {
        item.style.animation = 'none';
        item.style.fontWeight = '400';
      });
      // 歌词盒子还原偏移值
      lyricBoxEle.scrollTo({ top: 0 });
    }
  }, [activeSongId, activeSongList]);

  /**
   * @description: 歌曲时间变化时更新歌词状态
   */
  useEffect(() => {
    const lyricBox = lyricBoxRef.current as HTMLDivElement;
    if (!lyricBox) return;
    const childrenList = lyricBox?.querySelectorAll('.lyric-text');
    // 寻找高亮歌词索引值
    const index = lyricList.findIndex((item: any) => item.time >= currentTime);
    if (index !== -1 && index !== oldIndex) {
      highlightLyric(index);
    }

    // 更新界面显示高亮歌词的函数
    function highlightLyric(idx: number) {
      if (idx === 0) return;
      // 清除动画效果
      childrenList.forEach((item: any) => {
        item.style.animation = 'none';
        item.style.fontWeight = '400';
      });
      // 当前歌词添加动画
      const targetEle = childrenList[idx - 1] as HTMLElement;
      targetEle.style.animation = `scan ${lyricList[idx - 1].duration}s ease-out`;
      targetEle.style.fontWeight = '600';
      // 高亮到第五行歌词开始滚动
      if (idx < 5) return;
      lyricBox.scrollTo({
        top: 40 * (idx - 5), // 每行歌词的高度40px
        behavior: 'smooth',
      });
      setOldIndex(idx); // 下一句歌词的参考索引值
    }
  }, [currentTime, lyricList, oldIndex]);

  // 歌词页面自己维护歌曲当前播放时间(提高实时性)
  useEffect(() => {
    function timeUpdate() {
      setCurrentTime(audio.currentTime);
    }
    audio.addEventListener('timeupdate', timeUpdate);

    return () => {
      audio && audio.removeEventListener('timeupdate', timeUpdate);
    };
  }, [activeSongId]);

  return (
    <LyricStyles>
      <div className="lyric-box" ref={lyricBoxRef}>
        {!!lyricList.length &&
          lyricList.map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div className="lyric-line" key={index}>
                <div className="lyric-text">{item.lyric}</div>
              </div>
            );
          })}
      </div>
    </LyricStyles>
  );
};

export default memo(Lyric);
