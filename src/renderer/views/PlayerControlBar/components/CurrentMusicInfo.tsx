import React, { memo, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { CurrentMusicInfoStyles } from '@/renderer/views/PlayerControlBar/styles/CurrentMusicInfoStyles';
import classNames from 'classnames';

interface IProps {
  showLyrics: boolean;
}

/**
 * @description: 当前播放的歌曲信息
 */
const CurrentMusicInfo = ({ showLyrics }: IProps) => {
  const { activeSongId, activeSongList } = useSelector(
    (state: RootState) => ({
      activeSongList: state.playerControl.activeSongList,
      activeSongId: state.playerControl.activeSongId,
    }),
    shallowEqual,
  );

  // 当前播放的歌曲
  const currentSong = useMemo(() => {
    return activeSongList.find((song) => song.songId === activeSongId) || {};
  }, [activeSongId, activeSongList]);

  return (
    <CurrentMusicInfoStyles>
      <div
        className={classNames(
          'info-text',
          showLyrics ? 'info-text-show-lyrics' : '',
        )}
      >
        <div className="singer ellipsis" title={currentSong?.singer}>
          {currentSong?.singer || 'Eliauk'}
        </div>
        <div className="song-name ellipsis" title={currentSong?.songName}>
          {currentSong?.songName || '音乐一下'}
        </div>
      </div>
    </CurrentMusicInfoStyles>
  );
};

export default memo(CurrentMusicInfo);
