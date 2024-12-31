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
import AnalyzeCanvas from '@/renderer/views/LyricFullScreen/components/AnalyzeCanvas';
import { useDoubleClick } from '@/renderer/hooks/useDoubleClick';

/**
 * @description:全屏歌词界面
 */
const LyricFullScreen = () => {
  const { dragEleRef } = useUpdateWindowPosition(); // 窗口拖拽
  useDoubleClick(dragEleRef); // 双击全屏

  const { showLyrics, fullScreen } = useSelector(
    (state: RootState) => ({
      showLyrics: state.playerControl.showLyrics,
      fullScreen: state.global.fullScreen,
    }),
    shallowEqual,
  );
  const [initWidthHeight, setInitWidthHeight] = useState({
    width: 0,
    height: 0,
  });
  const jukeLyricRef = useRef<HTMLDivElement | null>(null);

  /**
   *  监听页面视图尺寸变化
   */
  useEffect(() => {
    const jukeLyricEle = jukeLyricRef.current;

    // 计算唱片机的宽度
    const computeWidth = () => {
      const rect = jukeLyricEle?.getBoundingClientRect();
      if (!rect) return;
      setInitWidthHeight({
        width: rect.width / 2,
        height: rect.height / 2,
      });
    };

    computeWidth();
    window.addEventListener('resize', computeWidth);
    return () => {
      window.removeEventListener('resize', computeWidth);
    };
  }, [showLyrics]);

  return (
    <LyricFullScreenStyles
      style={{ transform: showLyrics ? 'translateY(0%)' : 'translateY(100%)' }}
    >
      <div className="main-box">
        <div className="operation-bar" ref={dragEleRef}>
          <div className="left">
            <MiniLyricScreen></MiniLyricScreen>
          </div>
          <div className="right">
            <FullScreen fullScreen={fullScreen}></FullScreen>
            {!fullScreen && <MinScreen></MinScreen>}
            {!fullScreen && <MaxScreen></MaxScreen>}
          </div>
        </div>
        <div className="juke-lyric" ref={jukeLyricRef}>
          <JukeBox initWidthHeight={initWidthHeight}></JukeBox>
          <Lyric initWidthHeight={initWidthHeight}></Lyric>
        </div>
        <div className="analyze">
          <AnalyzeCanvas></AnalyzeCanvas>
        </div>
      </div>

      <div className="bottom-box">
        <PlayControlBar></PlayControlBar>
      </div>
    </LyricFullScreenStyles>
  );
};

export default memo(LyricFullScreen);
