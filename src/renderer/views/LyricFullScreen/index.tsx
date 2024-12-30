import React, { memo, useEffect, useRef, useState } from 'react';
import { LyricFullScreenStyles } from '@/renderer/views/LyricFullScreen/styles/LyricFullScreenStyles';
import PlayControlBar from '@/renderer/views/PlayerControlBar';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import MiniLyricScreen from '@/renderer/views/LyricFullScreen/components/MiniLyricScreen';
import MaxScreen from '@/renderer/views/OperationBar/windowTools/MaxScreen';
import FullScreen from '@/renderer/views/OperationBar/windowTools/FullScreen';
import { useUpdateWindowPosition } from '@/renderer/hooks/useUpdateWindowPosition';
import Lyric from '@/renderer/views/LyricFullScreen/components/Lyric';
import JukeBox from '@/renderer/views/LyricFullScreen/components/JukeBox';
import MinScreen from '@/renderer/views/OperationBar/windowTools/MinScreen';

/**
 * @description:全屏歌词界面
 */
const LyricFullScreen = () => {
  const { dragEleRef } = useUpdateWindowPosition();
  const { showLyrics } = useSelector(
    (state: RootState) => ({
      showLyrics: state.playerControl.showLyrics,
    }),
    shallowEqual,
  );
  const [initWidth, setInitWidth] = useState(0);
  const jukeLyricRef = useRef<HTMLDivElement | null>(null);

  // 监听页面视图尺寸变化
  useEffect(() => {
    const jukeLyricEle = jukeLyricRef.current;

    // 计算唱片机的宽度
    const computeWidth = () => {
      const rect = jukeLyricEle?.getBoundingClientRect();
      console.log('计算宽度', rect);
      setInitWidth((prevState) => (rect?.width || prevState) / 2);
    };

    computeWidth();
    window.addEventListener('resize', computeWidth);
    return () => {
      window.removeEventListener('resize', computeWidth);
    };
  }, [showLyrics]);

  return (
    showLyrics && (
      <LyricFullScreenStyles>
        <div className="main-box">
          <div className="operation-bar" ref={dragEleRef}>
            <div className="left">
              <MiniLyricScreen></MiniLyricScreen>
            </div>
            <div className="right">
              <FullScreen></FullScreen>
              <MinScreen></MinScreen>
              <MaxScreen></MaxScreen>
            </div>
          </div>
          <div className="juke-lyric" ref={jukeLyricRef}>
            <JukeBox initWidth={initWidth}></JukeBox>
            <Lyric initWidth={initWidth}></Lyric>
          </div>
        </div>

        <div className="bottom-box">
          <PlayControlBar></PlayControlBar>
        </div>
      </LyricFullScreenStyles>
    )
  );
};

export default memo(LyricFullScreen);
