import React, { memo, useState } from 'react';
import { MusicInfoStyles } from '@/renderer/views/components/SongItem/components/MusicInfoStyles';
import classNames from 'classnames';
import {
  playSong,
  pauseAudio,
} from '@/renderer/store/actions/audioPlayerActions';
import DynamicsBars from '@/renderer/views/components/DynamicsBars/DynamicsBars';

interface IMusicInfo {
  songInfo: any;
  isActiveSong: boolean; // 当前这首歌是否被激活
  isPlaying: boolean;
}

/**
 * @description: 歌曲item 的 歌曲信息组件
 */
const MusicInfo = memo(({ songInfo, isPlaying, isActiveSong }: IMusicInfo) => {
  // 暂停 / 播放
  const pauseOrPlay = () => {
    if (isActiveSong) {
      !isPlaying ? playSong() : pauseAudio();
    } else {
      playSong(songInfo);
    }
  };
  const [isEnter, setIsEnter] = useState(false);

  return (
    <MusicInfoStyles
      onMouseEnter={() => setIsEnter(true)}
      onMouseLeave={() => setIsEnter(false)}
    >
      <img className="img" src={songInfo?.songPic} alt="" />
      <div className="text">
        <div className="ellipsis">{songInfo?.songName || '--'}</div>
        <div className="singer ellipsis">{songInfo?.singer || '--'}</div>
      </div>
      <div className="img-mask">
        {isPlaying && isActiveSong && !isEnter && <DynamicsBars></DynamicsBars>}
        {isActiveSong && (
          <i
            className={classNames(
              'iconfont',
              isPlaying && isEnter ? 'icon-zanting' : '',
              !isPlaying ? 'icon-bofang' : '',
            )}
            style={{ color: '#ffffff' }}
            onClick={() => {
              pauseOrPlay();
            }}
          ></i>
        )}
      </div>
    </MusicInfoStyles>
  );
});

export default MusicInfo;
