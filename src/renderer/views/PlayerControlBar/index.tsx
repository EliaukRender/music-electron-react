import React, { memo, useState } from 'react';
import { PlayControlBarStyles } from '@/renderer/views/PlayerControlBar/styles/PlayControlBarStyles';
import { useForbidMouseDown } from '@/renderer/hooks/useForbidMouseDown';
import MusicMiniPicture from '@/renderer/views/PlayerControlBar/components/MusicMiniPicture';
import CurrentMusicInfo from '@/renderer/views/PlayerControlBar/components/CurrentMusicInfo';
import LikeSong from '@/renderer/views/PlayerControlBar/components/LikeSong';
import ToolsPopover from '@/renderer/views/PlayerControlBar/components/ToolsPopover';
import ControlBtnGroup from '@/renderer/views/PlayerControlBar/components/ControlBtnGroup';
import PlayMode from '@/renderer/views/PlayerControlBar/components/PlayMode';
import VolumeAdjuster from '@/renderer/views/PlayerControlBar/components/VolumeAdjuster';
import TimeLine from '@/renderer/views/PlayerControlBar/components/TimeLine';
import AnalyzeEntry from '@/renderer/views/PlayerControlBar/components/AnalyzeEntry';
import ActiveSongEntry from '@/renderer/views/PlayerControlBar/components/ActiveSongEntry';
import LyricEntry from '@/renderer/views/PlayerControlBar/components/LyricEntry';
import { RootState } from '@/renderer/store';
import { shallowEqual, useSelector } from 'react-redux';

/**
 * @description: 音乐控制栏
 */
const PlayControlBar = () => {
  const { forbidMouseDownEleRef } = useForbidMouseDown();
  const [isHover, setIsHover] = useState(false);
  const { showLyrics } = useSelector(
    (state: RootState) => ({
      showLyrics: state.playerControl.showLyrics,
    }),
    shallowEqual,
  );

  return (
    <PlayControlBarStyles
      className="player-control-bar"
      ref={forbidMouseDownEleRef}
    >
      <div className="box">
        <div className="left">
          <MusicMiniPicture showLyrics={showLyrics}></MusicMiniPicture>
          <CurrentMusicInfo showLyrics={showLyrics}></CurrentMusicInfo>
          <LikeSong></LikeSong>
          <ToolsPopover showLyrics={showLyrics}></ToolsPopover>
        </div>
        <div
          className="middle"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="top">
            <PlayMode isHover={isHover} showLyrics={showLyrics}></PlayMode>
            <ControlBtnGroup showLyrics={showLyrics}></ControlBtnGroup>
            <VolumeAdjuster
              isHover={isHover}
              showLyrics={showLyrics}
            ></VolumeAdjuster>
          </div>
          <div className="bottom">
            <TimeLine showLyrics={showLyrics}></TimeLine>
          </div>
        </div>
        <div className="right">
          <AnalyzeEntry showLyrics={showLyrics}></AnalyzeEntry>
          <LyricEntry showLyrics={showLyrics}></LyricEntry>
          <ActiveSongEntry showLyrics={showLyrics}></ActiveSongEntry>
        </div>
      </div>
    </PlayControlBarStyles>
  );
};

export default memo(PlayControlBar);
