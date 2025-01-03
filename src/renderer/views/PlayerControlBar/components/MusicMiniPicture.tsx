import React, { memo, useEffect, useMemo } from 'react';
import { MusicMiniPictureStyles } from '@/renderer/views/PlayerControlBar/styles/MusicMiniPictureStyles';
import { motion, useAnimationControls } from 'framer-motion';
import classNames from 'classnames';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setShowLyric } from '@/renderer/store/modules/playerControlReducer';

interface IProps {
  showLyrics: boolean;
}

/**
 * @description: 歌词封面缩略图
 */
const MusicMiniPicture = ({ showLyrics }: IProps) => {
  const dispatch = useDispatch();
  const controls = useAnimationControls();

  const { activeSongId, activeSongList } = useSelector(
    (state: RootState) => ({
      activeSongList: state.playerControl.activeSongList,
      activeSongId: state.playerControl.activeSongId,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (!showLyrics) {
      // 全屏歌词关闭时
      controls.start({ opacity: 0, transition: { duration: 0.5 } });
    } else {
      // 全屏歌词打开时
      controls.start({ opacity: 1, transition: { duration: 0.5 } });
    }
  }, [controls, showLyrics]);

  // 鼠标进入
  const onMouseEnter = () => {
    if (!showLyrics) {
      controls.start({ opacity: 1, transition: { duration: 0.5 } });
    }
  };

  // 鼠标离开
  const onMouseLeave = () => {
    if (!showLyrics) {
      controls.start({ opacity: 0, transition: { duration: 0.5 } });
    }
  };

  // 获取当前歌曲的缩略图
  const getCurSongPic = useMemo(() => {
    return activeSongList.find((item) => item.songId === activeSongId)?.songPic;
  }, [activeSongId, activeSongList]);

  return (
    <MusicMiniPictureStyles>
      <div
        className="music-pic-area"
        onClick={() => {
          dispatch(setShowLyric(!showLyrics));
        }}
      >
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
