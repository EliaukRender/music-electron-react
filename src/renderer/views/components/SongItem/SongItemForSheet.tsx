import React, { memo, useCallback, useMemo } from 'react';
import { SongItemForSheetStyles } from '@/renderer/views/components/SongItem/styles/SongItemFromSheetStyles';
import MusicInfo from '@/renderer/views/components/SongItem/components/MusicInfo';
import LikeSong from '@/renderer/views/PlayerControlBar/components/LikeSong';
import MoveMusicPopover from '@/renderer/views/components/MoveSongPopover/MoveSongPopover';
import DeleteSong from '@/renderer/views/components/DeleteSong/DeleteSong';
import classNames from 'classnames';
import { useSongItem } from '@/renderer/hooks/useSongItem';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';
import { playSong } from '@/renderer/store/actions/audioPlayerActions';
import Emitter from '@/renderer/eventBus/event-emitter';
import EventBusEnum from '@/renderer/eventBus/modules/eventBusEnum';
import { handleDeleteSongFromSheet } from '@/renderer/store/actions/mainMenuActions';
import { SheetMenuItemType } from '@/renderer/types/menuTypes';

interface PropsType {
  songInfo: any;
  index: number;
  activeSongId: number;
  activeSheet: SheetMenuItemType;
}

/**
 * @description: 歌单列表(歌单) 中的歌曲item
 */
const SongItemForSheet = ({
  songInfo,
  index,
  activeSongId,
  activeSheet,
}: PropsType) => {
  const { stopPropagationEleRef } = useStopPropagation();
  // song-item的操作按钮区域、缩略图遮罩的class类名
  const classList = useMemo(() => {
    return [
      `.operation-group-${index}-for-sheet`,
      `.music-info-${index}-for-sheet .img-mask`,
    ];
  }, [index]);

  const {
    isPlaying,
    songItemRef,
    isActiveSong,
    hiddenAnimation,
    showAnimation,
  } = useSongItem({ songInfo, activeSongId, classList });

  const playHandler = useCallback(() => {
    playSong(songInfo);
  }, [songInfo]);

  const deleteHandler = useCallback(() => {
    handleDeleteSongFromSheet({
      sheetId: activeSheet.sheetId,
      songId: songInfo.songId,
    });
  }, [activeSheet.sheetId, songInfo.songId]);

  // 鼠标右键菜单
  const menu = useMemo(() => {
    return [
      {
        label: '播放',
        onClick: playHandler,
        icon: 'icon-bofang1',
      },
      {
        label: '删除',
        onClick: deleteHandler,
        icon: 'icon-shanchu',
      },
    ];
  }, [deleteHandler, playHandler]);

  // 鼠标右键
  const onContextMenuHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    Emitter.emit(EventBusEnum.ContextMenu, {
      contextMenu: menu,
      position: {
        x: event.clientX,
        y: event.clientY,
      },
    });
  };

  return (
    <SongItemForSheetStyles onContextMenu={onContextMenuHandler}>
      <div
        ref={songItemRef}
        className={classNames(
          'song-item-for-sheet',
          index % 2 === 0 ? 'odd' : '',
          isActiveSong ? 'active' : '',
        )}
        onMouseEnter={() => {
          showAnimation();
        }}
        onMouseLeave={() => {
          if (isActiveSong) return;
          hiddenAnimation();
        }}
      >
        {/* 歌曲信息 */}
        <div className={`music-info music-info-${index}-for-sheet`}>
          <MusicInfo
            isActiveSong={isActiveSong}
            songInfo={songInfo}
            isPlaying={isPlaying}
          ></MusicInfo>
        </div>

        {/* 操作按钮 */}
        <div
          className={`operation-group operation-group-${index}-for-sheet`}
          ref={stopPropagationEleRef}
        >
          {/* 喜欢 */}
          <LikeSong></LikeSong>
          <div className="move-music">
            {/* 添加到其他歌单 */}
            <MoveMusicPopover curSong={songInfo}>
              <i className="iconfont icon-tianjia1"></i>
            </MoveMusicPopover>
          </div>
          {/* 删除 */}
          <DeleteSong
            isPlaying={isPlaying}
            isActiveSong={isActiveSong}
            onlyShowDeleteIcon
            activeSheet={activeSheet}
            songInfo={songInfo}
          ></DeleteSong>
        </div>

        {/* 歌曲时长、专辑信息 */}

        <div className="album ellipsis">{songInfo?.album || '暂无专辑'}</div>
        <div className="duration ellipsis">
          {songInfo?.duration || '暂无时长'}
        </div>
      </div>
    </SongItemForSheetStyles>
  );
};

export default memo(SongItemForSheet);
