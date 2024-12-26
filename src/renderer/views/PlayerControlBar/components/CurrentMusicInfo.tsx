import React, { memo, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { CurrentMusicInfoStyles } from '@/renderer/views/PlayerControlBar/styles/CurrentMusicInfoStyles';

/**
 * @description: 当前播放的歌曲信息
 */
const CurrentMusicInfo = () => {
  const { showLyrics, activeSongId, activeSongList } = useSelector(
    (state: RootState) => ({
      showLyrics: state.playerControl.showLyrics,
      activeSongList: state.playerControl.activeSongList,
      activeSongId: state.playerControl.activeSongId,
    }),
    shallowEqual,
  );

  // 当前歌曲
  const currentSong = useMemo(() => {
    return activeSongList.find((song) => song.songId === activeSongId) || {};
  }, [activeSongList]);

  return (
    <CurrentMusicInfoStyles>
      <div className="info-text">
        <div className="singer">{currentSong?.singer || 'Eliauk'}</div>
        <div className="song-name">{currentSong?.songName || '音乐一下'}</div>
      </div>
    </CurrentMusicInfoStyles>
  );
};

export default memo(CurrentMusicInfo);
