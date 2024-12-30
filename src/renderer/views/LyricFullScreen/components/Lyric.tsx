// @ts-nocheck
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { LyricStyles } from '@/renderer/views/LyricFullScreen/styles/LyricStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { transformLyric } from '@/renderer/utils/lyric/transformLyric';
import { RootState } from '@/renderer/store';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Emitter from '@/renderer/eventBus/event-emitter';
import { LyricInteraction } from '@/renderer/eventBus/modules/lyricInteraction';

interface IProps {
  initWidth: number;
}

/**
 * @description: 歌词
 */
const Lyric = ({ initWidth }: IProps) => {
  const { activeSongId, activeSongList, currentTime, isPlaying } = useSelector(
    (state: RootState) => ({
      activeSongId: state.playerControl.activeSongId,
      activeSongList: state.playerControl.activeSongList,
      currentTime: state.audioPlayer.currentTime,
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );
  const [activeLyric, setActiveLyric] = useState();
  const lyricBoxRef = useRef<HTMLDivElement | null>(null);
  const lyricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeLine = useRef();
  gsap.registerPlugin(ScrollToPlugin);

  // 当前歌曲
  const activeSong = useMemo(() => {
    return activeSongList.find((song) => song.songId === activeSongId) || {};
  }, [activeSongId, activeSongList]);

  // 当前歌词列表
  const lyricList = useMemo(() => {
    return activeSong?.lyric ? transformLyric(activeSong?.lyric) : [];
  }, [activeSong]);

  /**
   * @description:歌词动画效果
   */
  useEffect(() => {
    console.log('lyricLineRef', lyricRefs.current, lyricList);
    timeLine.current = gsap.timeline();

    lyricList.forEach((lyric, index) => {
      const target = lyricRefs.current[index];

      timeLine.current.to(target, {
        backgroundSize: '100% 100%',
        duration: lyric.duration,
        pause: true,

        /* 每一句歌词动画 开始 */
        onStart: () => {
          console.log('onStart');
          boldLyric(target);
        },

        /* 每一句歌词动画 结束 */
        onComplete: () => {
          gsap.set(target, { clearProps: 'all' });
          gsap.killTweensOf(target);
          handleBoxScroll(index); // 歌词滚动
        },
      });
    });
  }, [lyricList]);

  // 歌词字体加粗变大
  const boldLyric = (target) => {
    gsap.to(target, {
      fontWeight: 600,
      height: '55px',
      lineHeight: '55px',
      fontSize: 22,
      duration: 0.1,
    });
  };

  // 歌词滚动
  const handleBoxScroll = (index: number) => {
    if (index < 3) return;
    gsap.to(lyricBoxRef.current, {
      duration: 0,
      scrollTo: 40 * (index - 3),
      ease: 'power2.in',
    });
  };

  /**
   *  监听音乐的 时间节点变化
   */
  useEffect(() => {
    Emitter.on(LyricInteraction.change_current_time, handleForward);

    // 处理快进、后退事件
    function handleForward(time) {
      let newIndex = lyricList.findIndex((item) => item.startTime > time);
      if (newIndex !== -1) {
        newIndex -= 1;
      } else {
        newIndex = lyricRefs.current.length;
      }
      console.log('newIndex', newIndex);
      lyricRefs.current.forEach((item, index) => {
        if (index < newIndex) {
          gsap.killTweensOf(item);
          gsap.set(item, { clearProps: 'all' });
        }
      });
      timeLine.current.seek(time);
      boldLyric(lyricRefs.current[newIndex]);
      handleBoxScroll(newIndex);
    }
  }, [lyricList]);

  // 歌词动画的开始与暂停
  useEffect(() => {
    if (isPlaying) {
      timeLine.current.play();
    } else {
      timeLine.current.pause();
    }
  }, [isPlaying]);

  return (
    <LyricStyles style={{ paddingLeft: 0.1 * initWidth }}>
      <div
        ref={lyricBoxRef}
        className="lyric-box"
        style={{
          width: 0.6 * initWidth,
          height: 0.7 * initWidth,
        }}
      >
        {!!lyricList.length &&
          lyricList.map((item, index) => {
            return (
              <div className="lyric-line" key={index}>
                <div
                  ref={(el: HTMLDivElement) => {
                    lyricRefs.current[index] = el;
                  }}
                  className="lyric-text"
                >
                  {item.lyric}
                </div>
              </div>
            );
          })}
      </div>
    </LyricStyles>
  );
};

export default memo(Lyric);
