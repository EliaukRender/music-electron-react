import React, { memo, useEffect, useMemo } from 'react';
import { SongItemForActiveStyles } from '@/renderer/views/components/SongItem/styles/SongItemForActiveStyles';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import LikeSong from '@/renderer/views/PlayerControlBar/components/LikeSong';
import DeleteSong from '@/renderer/views/components/DeleteSong/DeleteSong';
import MoveMusicPopover from '@/renderer/views/components/MoveSongPopover/MoveSongPopover';
import MusicInfo from '@/renderer/views/components/SongItem/components/MusicInfo';
import gsap from 'gsap';

interface PropsType {
  songInfo: any;
  index: number;
}
/**
 * @description: 播放队列弹窗 的歌曲item
 */
const SongItemForActive = ({ songInfo, index }: PropsType) => {
  const { activeSongId, isPlaying } = useSelector(
    (state: RootState) => ({
      activeSongId: state.playerControl.activeSongId,
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );

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

  // 出现
  const showAnimation = () => {
    gsap.to(classList, { opacity: 1, duration: 0.2 });
  };

  // 隐藏
  const hiddenAnimation = () => {
    if (isActiveSong) return;
    gsap.to(classList, { opacity: 0, duration: 0.2 });
  };

  return (
    <SongItemForActiveStyles
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
    </SongItemForActiveStyles>
  );
};

export default memo(SongItemForActive);