import React, { memo } from 'react';
import { NonSongStyles } from '@/renderer/views/SheetCommon/styles/NonSongStyles';

const NonSong = () => {
  return (
    <NonSongStyles>
      <div className="icon">
        <i className="iconfont icon-yinyuehe"></i>
      </div>
      <div className="text">暂无歌曲数据~</div>
    </NonSongStyles>
  );
};

export default memo(NonSong);
