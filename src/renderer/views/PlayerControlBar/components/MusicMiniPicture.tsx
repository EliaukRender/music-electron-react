import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { MusicMiniPictureStyles } from '@/renderer/views/PlayerControlBar/styles/MusicMiniPictureStyles';
import { motion, useAnimationControls } from 'framer-motion';
import classNames from 'classnames';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setShowLyric } from '@/renderer/store/modules/playerControlReducer';
import windowUi from '@/renderer/ipcRenderer/rendererInteraction/windowUi';

interface IProps {
  showLyrics: boolean;
}

/**
 * @description: 歌词封面缩略图
 */
const MusicMiniPicture = ({ showLyrics }: IProps) => {
  const dispatch = useDispatch();
  const controls = useAnimationControls();
  const { activeSongId, activeSongList, isFullScreen } = useSelector(
    (state: RootState) => ({
      activeSongList: state.playerControl.activeSongList,
      activeSongId: state.playerControl.activeSongId,
      isFullScreen: state.global.isFullScreen,
    }),
    shallowEqual,
  );

  const getCurSongPic = useMemo(() => {
    return activeSongList.find((item) => item.songId === activeSongId)?.songPic;
  }, [activeSongId, activeSongList]);

  useEffect(() => {
    if (!showLyrics) {
      controls.start({ opacity: 0, transition: { duration: 0.5 } });
    } else {
      controls.start({ opacity: 1, transition: { duration: 0.5 } });
    }
  }, [controls, showLyrics]);

  const onMouseEnter = () => {
    if (!showLyrics) {
      controls.start({ opacity: 1, transition: { duration: 0.5 } });
    }
  };

  const onMouseLeave = () => {
    if (!showLyrics) {
      controls.start({ opacity: 0, transition: { duration: 0.5 } });
    }
  };

  const handleClick = useCallback(() => {
    dispatch(setShowLyric(!showLyrics));
    if (isFullScreen) {
      windowUi.fullScreen();
    }
  }, [dispatch, isFullScreen, showLyrics]);

  return (
    <MusicMiniPictureStyles>
      <div className="music-pic-area" onClick={handleClick}>
        <motion.div
          className="full-screen"
          animate={controls}
          initial={{ opacity: 0 }}
          onMouseEnter={() => {
            onMouseEnter();
          }}
          onMouseLeave={() => {
            onMouseLeave();
          }}
        >
          <i
            className={classNames(
              `iconfont icon-${showLyrics ? 'zhankaidown' : 'zhankaiup-copy'}`,
            )}
          ></i>
        </motion.div>
        <img
          className="music-pic"
          src={
            getCurSongPic || require('@/renderer/assets/images/music-info.png')
          }
          alt=""
        />
      </div>
    </MusicMiniPictureStyles>
  );
};

export default memo(MusicMiniPicture);
