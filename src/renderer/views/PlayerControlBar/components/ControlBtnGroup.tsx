import React, { memo, useState } from 'react';
import {
  BackwardOutlined,
  CaretRightOutlined,
  ForwardOutlined,
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import {
  addCurrentTime,
  decreaseCurrentTime,
  pauseAudio,
  playNextSong,
  playPreSong,
  playSong,
} from '@/renderer/store/actions/audioPlayerActions';
import { ControlBtnGroupStyles } from '@/renderer/views/PlayerControlBar/styles/ControlBtnGroupStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '@/renderer/store';

const ControlBtnGroup = () => {
  const { isPlaying } = useSelector(
    (state: RootState) => ({
      isPause: state.audioPlayer.isPause,
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );

  const handleForward = () => {
    addCurrentTime();
  };

  return (
    <ControlBtnGroupStyles>
      <motion.div className="btns">
        {/* 后退 */}
        <BackwardOutlined
          onClick={() => {
            decreaseCurrentTime();
          }}
        />
        {/* 上一首 */}
        <StepBackwardOutlined
          onClick={() => {
            playPreSong();
          }}
        />
        {/* 播放暂停 */}
        <div className="play-pause">
          {!isPlaying && (
            <CaretRightOutlined
              onClick={() => {
                playSong();
              }}
            />
          )}
          {isPlaying && (
            <PauseOutlined
              onClick={() => {
                pauseAudio();
              }}
            />
          )}
        </div>
        {/* 下一首 */}
        <StepForwardOutlined
          onClick={() => {
            playNextSong(true);
          }}
        />
        {/* 快进 */}
        <ForwardOutlined onClick={handleForward} />
      </motion.div>
    </ControlBtnGroupStyles>
  );
};

export default memo(ControlBtnGroup);
