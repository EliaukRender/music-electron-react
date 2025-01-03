import React, { memo } from 'react';
import { LikeSongStyles } from '@/renderer/views/PlayerControlBar/styles/LikeSongStyles';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

/**
 * @description: 喜欢歌曲
 */
const LikeSong = () => {
  const { stopPropagationRef } = useStopPropagation();

  const clickLikeSong = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <LikeSongStyles ref={stopPropagationRef}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <img
        className="heart no-click-bubble"
        src={require('@/renderer/assets/images/icons/heart.png')}
        alt=""
        onClick={clickLikeSong}
      />
    </LikeSongStyles>
  );
};

export default memo(LikeSong);
