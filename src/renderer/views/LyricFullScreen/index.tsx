import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
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
import winUiEmitter from '@/renderer/ipcRenderer/mainWindow/winUiEmitter';
import { setIsMaximize } from '@/renderer/store/modules/globalReducer';

/**
 * @description:全屏歌词界面
 */
const LyricFullScreen = () => {
  const { showLyrics, isFullScreen, isMaximize } = useSelector(
    (state: RootState) => ({
      showLyrics: state.playerControl.showLyrics,
      isFullScreen: state.global.isFullScreen,
      isMaximize: state.global.isMaximize,
    }),
    shallowEqual,
  );
  const [initWidthHeight, setInitWidthHeight] = useState({
    width: 0,
    height: 0,
  });
  const jukeLyricRef = useRef<HTMLDivElement | null>(null);

  const { dragEleRef } = useUpdateWindowPosition({}); // 窗口拖拽

  // 双击后最大窗口
  const handleDoubleClick = useCallback(() => {
    if (isFullScreen) return;
    winUiEmitter.maximize();
    setIsMaximize(!isMaximize);
  }, [isFullScreen, isMaximize]);

  useDoubleClick(dragEleRef, handleDoubleClick); // 操作栏区域鼠标双击事件

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
            <FullScreen isFullScreen={isFullScreen}></FullScreen>
            {!isFullScreen && <MinScreen></MinScreen>}
            {!isFullScreen && <MaxScreen></MaxScreen>}
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
