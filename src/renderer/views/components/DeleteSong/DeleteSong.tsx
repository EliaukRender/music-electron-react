import React, { memo } from 'react';
import { DeleteSongStyles } from '@/renderer/views/components/DeleteSong/DeleteSongStyles';

interface PropsType {
  onlyShowDeleteIcon: boolean;
}

/**
 * @description: 1、从播放队列删除歌曲； 2、从歌单删除歌曲
 */
const DeleteSong = ({ onlyShowDeleteIcon = false }: PropsType) => {
  const deleteFromList = () => {
    //
  };

  const deleteFromSheet = () => {
    //
  };

  return (
    <DeleteSongStyles>
      <div className="feat-item" onClick={deleteFromList}>
        <i className="iconfont icon-shanchu"></i>
        {!onlyShowDeleteIcon && <div>从播放列表删除</div>}
      </div>
    </DeleteSongStyles>
  );
};

export default memo(DeleteSong);
