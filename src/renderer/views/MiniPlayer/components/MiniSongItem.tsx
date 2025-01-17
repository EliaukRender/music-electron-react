import React, { memo, useCallback, useEffect, useRef } from 'react';
import { MiniSongItemStyles } from '@/renderer/views/MiniPlayer/styles/MiniSongItemStyles';
import classNames from 'classnames';
import gsap from 'gsap';
import miniPlayerEmitter from '@/renderer/ipcRenderer/miniPlayer/miniPlayerEmitter';
import { useDoubleClick } from '@/renderer/hooks/useDoubleClick';
import { IMiniPlayerData } from '@/renderer/types/IMiniPlayer';

interface IProps {
  index: number;
  miniPlayerData: IMiniPlayerData;
  songInfo: any;
  activeSong: any;
}
/**
 * @description: 歌曲
 */
const MiniSongItem = memo(
  ({ index, miniPlayerData, songInfo, activeSong }: IProps) => {
    // 鼠标进入
    const onMouseEnter = useCallback((idx: number) => {
      gsap.to(`.song-item-${idx} .song-item-btn-group`, {
        opacity: 1,
        duration: 0.2,
      });
    }, []);

    // 鼠标离开
    const onMouseLeave = useCallback((idx: number) => {
      gsap.to(`.song-item-${idx} .song-item-btn-group`, {
        opacity: 0,
        duration: 0.2,
      });
    }, []);

    // 喜欢
    const handleLikeSong = useCallback((songId: number) => {
      miniPlayerEmitter.likeSong(songId);
    }, []);

    // 双击播放
    const songItemRef = useRef<HTMLDivElement | null>(null);
    const dbClickCallback = useCallback(() => {
      miniPlayerEmitter.playNew(songInfo);
    }, [songInfo]);
    useDoubleClick(songItemRef, dbClickCallback);

    // 播放或暂停
    const handlePlay = useCallback(() => {
      if (songInfo.songId === miniPlayerData.activeSongId) {
        miniPlayerData.isPlaying
          ? miniPlayerEmitter.pausePlay()
          : miniPlayerEmitter.startPlay();
      } else {
        miniPlayerEmitter.playNew(songInfo);
      }
    }, [miniPlayerData.activeSongId, miniPlayerData.isPlaying, songInfo]);

    // 激活的歌曲滚动到可视区域
    useEffect(() => {
      if (miniPlayerData.activeSongId !== songInfo.songId) return;
      songItemRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
    }, [miniPlayerData.activeSongId, songInfo.songId]);

    return (
      <MiniSongItemStyles>
        <div
          ref={songItemRef}
          className={`song-item song-item-${index}`}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={() => onMouseLeave(index)}
          onBlur={() => onMouseLeave(index)}
        >
          <div
            className={classNames(
              'name',
              miniPlayerData.activeSongId === songInfo.songId
                ? 'name-active'
                : '',
            )}
          >
            {songInfo.songName}
          </div>
          {/* 操作按钮 */}
          <div className="song-item-btn-group">
            <div onClick={() => handlePlay()}>
              <i
                className={classNames(
                  'iconfont',
                  activeSong.songId === songInfo.songId &&
                    miniPlayerData.isPlaying
                    ? 'icon-zanting'
                    : 'icon-bofang1',
                )}
              ></i>
            </div>
            {/* 喜欢 */}
            <div onClick={() => handleLikeSong}>
              <img
                className="like-img"
                src={require('@/renderer/assets/images/icons/heart.png')}
                alt=""
              />
            </div>
          </div>
        </div>
      </MiniSongItemStyles>
    );
  },
);

export default MiniSongItem;
