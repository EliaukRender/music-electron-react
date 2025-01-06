import React, { memo, useMemo } from 'react';
import { SongItemForSheetStyles } from '@/renderer/views/components/SongItem/styles/SongItemFromSheetStyles';
import MusicInfo from '@/renderer/views/components/SongItem/components/MusicInfo';
import LikeSong from '@/renderer/views/PlayerControlBar/components/LikeSong';
import MoveMusicPopover from '@/renderer/views/components/MoveSongPopover/MoveSongPopover';
import DeleteSong from '@/renderer/views/components/DeleteSong/DeleteSong';
import classNames from 'classnames';
import { useSongItem } from '@/renderer/hooks/useSongItem';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

interface PropsType {
  songInfo: any;
  index: number;
  activeSongId: number;
}

/**
 * @description: 歌单列表(歌单) 中的歌曲item
 */
const SongItemForSheet = ({ songInfo, index, activeSongId }: PropsType) => {
  const { stopPropagationEleRef } = useStopPropagation();
  // song-item的操作按钮区域、缩略图遮罩的class类名
  const classList = useMemo(() => {
    return [
      `.operation-group-${index}-for-sheet`,
      `.music-info-${index}-for-sheet .img-mask`,
    ];
  }, [index]);

  const {
    isPlaying,
    songItemRef,
    isActiveSong,
    hiddenAnimation,
    showAnimation,
  } = useSongItem({ songInfo, activeSongId, classList });

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
        <div className={`music-info music-info-${index}-for-sheet`}>
          <MusicInfo
            isActiveSong={isActiveSong}
            songInfo={songInfo}
            isPlaying={isPlaying}
          ></MusicInfo>
        </div>

        {/* 操作按钮 */}
        <div
          className={`operation-group operation-group-${index}-for-sheet`}
          ref={stopPropagationEleRef}
        >
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
