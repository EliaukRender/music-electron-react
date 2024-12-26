import React, { memo } from 'react';
import { LikeSongStyles } from '@/renderer/views/PlayerControlBar/styles/LikeSongStyles';

/**
 * @description: 喜欢歌曲
 */
const LikeSong = () => {
  return (
    <LikeSongStyles>
      <img
        className="heart"
        src={require('@/renderer/assets/images/icons/heart.png')}
        alt=""
      />
    </LikeSongStyles>
  );
};

export default memo(LikeSong);
