import React, { memo } from 'react';
import { SongItemForActiveStyles } from '@/renderer/views/components/SongItem/styles/SongItemForActiveStyles';
import classNames from 'classnames';
import LikeSong from '@/renderer/views/PlayerControlBar/components/LikeSong';
import DeleteSong from '@/renderer/views/components/DeleteSong/DeleteSong';
import MoveMusicPopover from '@/renderer/views/components/MoveSongPopover/MoveSongPopover';
import MusicInfo from '@/renderer/views/components/SongItem/components/MusicInfo';
import { useSongItem } from '@/renderer/hooks/useSongItem';

interface PropsType {
  songInfo: any;
  index: number;
  activeSongId: number;
}

/**
 * @description: 播放队列弹窗 的歌曲item
 */
const SongItemForActive = ({ songInfo, index, activeSongId }: PropsType) => {
  const {
    isPlaying,
    songItemRef,
    isActiveSong,
    hiddenAnimation,
    showAnimation,
  } = useSongItem({ songInfo, index, activeSongId });

  return (
    <SongItemForActiveStyles>
      <div
        ref={songItemRef}
        className={classNames(
          'song-item-for-active',
          index % 2 === 0 ? 'odd' : '',
          isActiveSong ? 'active' : '',
        )}
        onMouseEnter={() => {
          showAnimation();
        }}
        onMouseLeave={() => {
          if (isActiveSong) return;
          hiddenAnimation();
        }}
      >
        {/* 歌曲信息 */}
        <div className={`music-info music-info-${index}`}>
          <MusicInfo
            isActiveSong={isActiveSong}
            songInfo={songInfo}
            isPlaying={isPlaying}
          ></MusicInfo>
        </div>
        {/* 操作按钮 */}
        <div className={`operation-group operation-group-${index}`}>
          <LikeSong></LikeSong>
          <div className="move-music">
            <MoveMusicPopover curSong={songInfo}>
              <i className="iconfont icon-tianjia1"></i>
            </MoveMusicPopover>
          </div>
          <DeleteSong onlyShowDeleteIcon></DeleteSong>
        </div>
      </div>
    </SongItemForActiveStyles>
  );
};

export default memo(SongItemForActive);
