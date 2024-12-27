import React, { memo } from 'react';
import { DeleteSongStyles } from '@/renderer/views/components/DeleteSong/DeleteSongStyles';

/**
 * @description: 1、从播放队列删除歌曲； 2、从歌单删除歌曲
 */
const DeleteSong = (props: PropsType) => {
  const { isFromActiveList, isFromSheet } = props;

  const deleteFromList = () => {
    //
  };

  const deleteFromSheet = () => {
    //
  };

  return (
    <DeleteSongStyles>
      {isFromActiveList && (
        <div className="feat-item" onClick={deleteFromList}>
          <i className="iconfont icon-shanchu"></i>
          <div>从播放列表删除</div>
        </div>
      )}
      {isFromSheet && (
        <div className="feat-item" onClick={deleteFromSheet}>
          <i className="iconfont icon-shanchu"></i>
        </div>
      )}
    </DeleteSongStyles>
  );
};

interface PropsType {
  isFromActiveList?: boolean;
  isFromSheet?: boolean;
}

DeleteSong.defaultProps = {
  isFromActiveList: false,
  isFromSheet: false,
};

export default memo(DeleteSong);
