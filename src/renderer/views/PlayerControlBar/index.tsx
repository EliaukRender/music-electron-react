import React, { memo } from 'react';
import { PlayControlBarStyles } from '@/renderer/views/PlayerControlBar/styles/PlayControlBarStyles';
import { useForbidMouseDown } from '@/renderer/hooks/useForbidMouseDown';
import MusicMiniPicture from '@/renderer/views/PlayerControlBar/components/MusicMiniPicture';
import CurrentMusicInfo from '@/renderer/views/PlayerControlBar/components/CurrentMusicInfo';
import LikeSong from '@/renderer/views/PlayerControlBar/components/LikeSong';

/**
 * @description: 音乐控制栏
 */
const PlayControlBar = () => {
  const { forbidMouseDownEleRef } = useForbidMouseDown();

  return (
    <PlayControlBarStyles ref={forbidMouseDownEleRef}>
      <div className="box">
        <div className="left">
          <MusicMiniPicture></MusicMiniPicture>
          <CurrentMusicInfo></CurrentMusicInfo>
          <LikeSong></LikeSong>
        </div>
        <div className="middle"></div>
        <div className="right"></div>
      </div>
    </PlayControlBarStyles>
  );
};

export default memo(PlayControlBar);
