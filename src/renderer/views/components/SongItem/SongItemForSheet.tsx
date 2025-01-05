import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { SongItemForSheetStyles } from '@/renderer/views/components/SongItem/styles/SongItemFromSheetStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import gsap from 'gsap';
import { playSong } from '@/renderer/store/actions/audioPlayerActions';
import { useDoubleClick } from '@/renderer/hooks/useDoubleClick';
import MusicInfo from '@/renderer/views/components/SongItem/components/MusicInfo';
import LikeSong from '@/renderer/views/PlayerControlBar/components/LikeSong';
import MoveMusicPopover from '@/renderer/views/components/MoveSongPopover/MoveSongPopover';
import DeleteSong from '@/renderer/views/components/DeleteSong/DeleteSong';
import classNames from 'classnames';

interface PropsType {
  songInfo: any;
  index: number;
}

/**
 * @description: 歌单列表(歌单) 中的歌曲item
 */
const SongItemForSheet = ({ songInfo, index }: PropsType) => {
  const { activeSongId, isPlaying } = useSelector(
    (state: RootState) => ({
      activeSongId: state.playerControl.activeSongId,
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );

  // 当前歌曲是否被选中激活
  const isActiveSong = useMemo(() => {
    return activeSongId === songInfo.songId;
  }, [activeSongId, songInfo]);

  useEffect(() => {
    if (isActiveSong) return;
    initAnimationStyles();
  });

  // 初始css样式
  const classList = [
    `.operation-group-${index}`,
    `.music-info-${index} .img-mask`,
  ];
  const initAnimationStyles = () => {
    gsap.set(classList, {
      opacity: 0,
    });
  };

  const showAnimation = () => {
    gsap.to(classList, { opacity: 1, duration: 0.2 });
  };

  const hiddenAnimation = () => {
    if (isActiveSong) return;
    gsap.to(classList, { opacity: 0, duration: 0.2 });
  };

  /**
   * 双击播放歌曲
   */
  const songItemRef = useRef<HTMLDivElement | null>(null);
  const handleDoubleClick = useCallback(() => {
    if (isActiveSong) {
      !isPlaying && playSong();
    } else {
      playSong(songInfo);
    }
  }, [songInfo, isActiveSong, isPlaying]);
  useDoubleClick(songItemRef, handleDoubleClick);

  return (
    <SongItemForSheetStyles
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

      {/* 歌曲时长、专辑信息 */}

      <div className="album ellipsis">{songInfo?.album || '暂无专辑'}</div>
      <div className="duration ellipsis">
        {songInfo?.duration || '暂无时长'}
      </div>
    </SongItemForSheetStyles>
  );
};

export default memo(SongItemForSheet);
