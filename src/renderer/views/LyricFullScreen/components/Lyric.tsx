// @ts-nocheck
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LyricStyles } from '@/renderer/views/LyricFullScreen/styles/LyricStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { transformLyric } from '@/renderer/utils/lyric/transformLyric';
import { RootState } from '@/renderer/store';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Emitter from '@/renderer/eventBus/event-emitter';
import { LyricInteraction } from '@/renderer/eventBus/modules/lyricInteraction';

interface IProps {
  initWidthHeight: { width: number; height: number };
}

/**
 * @description: 歌词
 */
const Lyric = ({ initWidthHeight }: IProps) => {
  const {
    activeSongId,
    activeSongList,
    isPlaying,
    currentTime,
    isPause,
    isEnded,
  } = useSelector(
    (state: RootState) => ({
      activeSongId: state.playerControl.activeSongId,
      activeSongList: state.playerControl.activeSongList,
      currentTime: state.audioPlayer.currentTime,
      isPlaying: state.audioPlayer.isPlaying,
      isPause: state.audioPlayer.isPause,
      isEnded: state.audioPlayer.isEnded,
    }),
    shallowEqual,
  );
  const lyricBoxRef = useRef<HTMLDivElement | null>(null);
  const lyricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lyricTween, setLyricTween] = useState({}); // 歌词高亮动画

  /**
   *  注册动画插件
   */
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  /**
   *  生成歌词
   */
  const lyricList = useMemo(() => {
    const song =
      activeSongList.find((item) => item.songId === activeSongId) || {};
    return song?.lyric ? transformLyric(song.lyric) : [];
  }, [activeSongId, activeSongList]);

  /**
   *   更新歌词高亮索引值
   */
  useEffect(() => {
    const newIndex = lyricList.findIndex((item) => currentTime < item?.endTime);
    if (newIndex === -1) return;
    // 高亮新的一句
    if (newIndex !== activeIndex) {
      lyricRefs.current.forEach((item) => {
        item && gsap.killTweensOf(item);
        item && gsap.set(item, { clearProps: 'all' });
      });
      setActiveIndex((prevState) => newIndex);
    }
  }, [activeIndex, currentTime, lyricList]);

  /**
   *   歌词高亮动画
   */
  const lyricAnimation = useCallback(() => {
    if (!lyricList.length || !lyricRefs.current.length) return;
    if (activeIndex > lyricRefs.current.length - 1) return;
    const target = lyricRefs.current[activeIndex];
    const animation = gsap.to(target, {
      backgroundSize: '100% 100%',
      duration: lyricList[activeIndex]?.duration,
      pause: true,
      onComplete: () => {
        gsap.set(target, { clearProps: 'all' });
      },
    });
    setLyricTween(animation);
  }, [activeIndex, lyricList]);

  /**
   *   歌词字体加粗变大动画
   */
  const lyricHighlight = useCallback(() => {
    const target = lyricRefs.current[activeIndex];
    gsap.to(target, {
      fontWeight: 600,
      fontSize: 22,
      duration: 0.2,
      ease: 'power2.in',
    });
  }, [activeIndex]);

  /**
   *  歌词滚动动画
   */
  useEffect(() => {
    if (activeIndex < 3) return;
    gsap.to(lyricBoxRef.current, {
      duration: 0.4,
      scrollTo: 40 * (activeIndex - 3),
      ease: 'power2.in',
    });
  }, [activeIndex]);

  /**
   *   控制歌词动画
   */
  useEffect(() => {
    if (isPlaying) {
      lyricAnimation();
      lyricHighlight();
    }
  }, [isPlaying, lyricHighlight, lyricAnimation]);

  /**
   *  歌词暂停
   */
  useEffect(() => {
    if (isPause && lyricTween) {
      lyricTween?.pause();
    }
  }, [isPause, lyricTween]);

  /**
   * 歌曲结束
   */
  useEffect(() => {
    if (isEnded) {
      setActiveIndex((prevState) => 0);
      setLyricTween((prevState) => {});
    }
  }, [isEnded]);

  /**
   *  用户改变播放音频当前播放时间
   */
  useEffect(() => {
    function handleChangeCurrentTime() {
      // 调整当前句高亮进度
      console.log('Emitter-activeIndex', activeIndex);
      const targetLyric = lyricList[activeIndex];
      const time = currentTime - targetLyric.startTime;
      lyricTween?.seek(time);
    }

    Emitter.on(LyricInteraction.change_current_time, handleChangeCurrentTime);

    return () => {
      Emitter.off(
        LyricInteraction.change_current_time,
        handleChangeCurrentTime,
      );
    };
  }, [activeIndex, lyricTween, currentTime, lyricList]);

  /**
   *  歌词每一行的高度 todo
   */

  return (
    <LyricStyles style={{ paddingLeft: 0.1 * initWidthHeight.width }}>
      <div
        ref={lyricBoxRef}
        className="lyric-box"
        style={{
          width: 0.6 * initWidthHeight.width,
          height: 0.7 * initWidthHeight.width,
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
