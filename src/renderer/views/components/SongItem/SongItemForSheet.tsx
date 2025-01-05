import React, { memo } from 'react';
import { SongItemForSheetStyles } from '@/renderer/views/components/SongItem/styles/SongItemFromSheetStyles';
import MusicInfo from '@/renderer/views/components/SongItem/components/MusicInfo';
import LikeSong from '@/renderer/views/PlayerControlBar/components/LikeSong';
import MoveMusicPopover from '@/renderer/views/components/MoveSongPopover/MoveSongPopover';
import DeleteSong from '@/renderer/views/components/DeleteSong/DeleteSong';
import classNames from 'classnames';
import { useSongItem } from '@/renderer/hooks/useSongItem';

interface PropsType {
  songInfo: any;
  index: number;
  activeSongId: number;
}

/**
 * @description: 歌单列表(歌单) 中的歌曲item
 */
const SongItemForSheet = ({ songInfo, index, activeSongId }: PropsType) => {
  const {
    isPlaying,
    songItemRef,
    isActiveSong,
    hiddenAnimation,
    showAnimation,
  } = useSongItem({ songInfo, index, activeSongId });

  return (
    <SongItemForSheetStyles>
      <div
        ref={songItemRef}
        className={classNames(
          'song-item-for-sheet',
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

        {/* 歌曲时长、专辑信息 */}

        <div className="album ellipsis">{songInfo?.album || '暂无专辑'}</div>
        <div className="duration ellipsis">
          {songInfo?.duration || '暂无时长'}
        </div>
      </div>
    </SongItemForSheetStyles>
  );
};

export default memo(SongItemForSheet);
