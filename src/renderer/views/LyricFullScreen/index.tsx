import React, { memo } from 'react';
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
import CloseApp from '@/renderer/views/OperationBar/windowTools/CloseApp';

/**
 * @description:全屏歌词界面
 */
const LyricFullScreen = () => {
  const { showLyrics } = useSelector(
    (state: RootState) => ({
      showLyrics: state.playerControl.showLyrics,
    }),
    shallowEqual,
  );

  const { dragEleRef } = useUpdateWindowPosition();
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
          <div className="juke-lyric">
            <JukeBox></JukeBox>
            <Lyric></Lyric>
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
