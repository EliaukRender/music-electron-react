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

/**
 * @description: 音乐控制栏
 */
const PlayControlBar = () => {
  const { forbidMouseDownEleRef } = useForbidMouseDown();
  const [isHover, setIsHover] = useState(false);

  return (
    <PlayControlBarStyles
      className="player-control-bar"
      ref={forbidMouseDownEleRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="box">
        <div className="left">
          <MusicMiniPicture></MusicMiniPicture>
          <CurrentMusicInfo></CurrentMusicInfo>
          <LikeSong></LikeSong>
          <ToolsPopover></ToolsPopover>
        </div>
        <div className="middle">
          <div className="top">
            <PlayMode isHover={isHover}></PlayMode>
            <ControlBtnGroup></ControlBtnGroup>
            <VolumeAdjuster isHover={isHover}></VolumeAdjuster>
          </div>
          <div className="bottom">
            <TimeLine></TimeLine>
          </div>
        </div>
        <div className="right">
          <AnalyzeEntry></AnalyzeEntry>
          <LyricEntry></LyricEntry>
          <ActiveSongEntry></ActiveSongEntry>
        </div>
      </div>
    </PlayControlBarStyles>
  );
};

export default memo(PlayControlBar);
