import React, { memo } from 'react';
import { MusicInfoStyles } from '@/renderer/views/components/SongItem/components/MusicInfoStyles';
import classNames from 'classnames';

interface IMusicInfo {
  songInfo: any;
  isActiveSong: boolean;
  isPlaying: boolean;
}

const MusicInfo = memo(({ songInfo, isPlaying, isActiveSong }: IMusicInfo) => {
  // 暂停 / 播放
  const pauseOrPlay = () => {
    //
  };

  return (
    <MusicInfoStyles>
      <img className="img" src={songInfo?.songPic} alt="" />
      <div className="text">
        <div className="ellipsis">{songInfo?.songName || '--'}</div>
        <div className="singer ellipsis">{songInfo?.singer || '--'}</div>
      </div>
      <div className="img-mask">
        <i
          className={classNames(
            'iconfont',
            isPlaying && isActiveSong ? 'icon-zanting' : 'icon-bofang',
          )}
          style={{ color: '#ffffff' }}
          onClick={() => {
            pauseOrPlay();
          }}
        ></i>
      </div>
    </MusicInfoStyles>
  );
});

export default MusicInfo;
