import React, { memo, useCallback } from 'react';
import { DeleteSongStyles } from '@/renderer/views/components/DeleteSong/DeleteSongStyles';
import { SheetMenuItemType } from '@/renderer/types/menuTypes';
import { handleDeleteSongFromSheet } from '@/renderer/store/actions/mainMenuActions';
import { playNextSong } from '@/renderer/store/actions/audioPlayerActions';

interface IProps {
  songInfo: any;
  activeSheet: SheetMenuItemType;
  isActiveSong: boolean;
  isPlaying: boolean;
  onlyShowDeleteIcon: boolean;
}

/**
 * @description: 1、从播放队列删除歌曲； 2、从歌单删除歌曲
 */
const DeleteSong = ({
  onlyShowDeleteIcon = false,
  songInfo,
  activeSheet = {} as SheetMenuItemType,
  isActiveSong,
  isPlaying,
}: IProps) => {
  // todo 删除歌曲以后需要判断状态
  const handleDelete = useCallback(async () => {
    // 1、从歌单删除
    await handleDeleteSongFromSheet({
      sheetId: activeSheet.sheetId,
      songId: songInfo.songId,
    });
    if (isActiveSong && isPlaying) {
      playNextSong(false);
    }
  }, [activeSheet?.sheetId, isActiveSong, isPlaying, songInfo?.songId]);

  return (
    <DeleteSongStyles>
      <div className="feat-item" onClick={handleDelete}>
        <i className="iconfont icon-shanchu"></i>
        {!onlyShowDeleteIcon && <div>从播放列表删除</div>}
      </div>
    </DeleteSongStyles>
  );
};

export default memo(DeleteSong);
