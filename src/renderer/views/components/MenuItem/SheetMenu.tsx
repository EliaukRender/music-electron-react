import { MenuItemStyles } from '@/renderer/views/components/MenuItem/MenuItemStyles';
import React, { memo, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { SheetMenuItemType, SheetTypeEnum } from '@/renderer/types/menuTypes';
import {
  setActiveMenu,
  setActiveSheet,
  setCurSheetSongList,
} from '@/renderer/store/modules/mainMenuReducer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import {
  getSongListBySheetId,
  handleDeleteSheet,
} from '@/renderer/store/actions/mainMenuActions';
import defaultPic from '@/renderer/assets/images/default-sheet-pic.png';
import Emitter from '@/renderer/eventBus/event-emitter';
import EventBusEnum from '@/renderer/eventBus/modules/eventBusEnum';
import { playSong } from '@/renderer/store/actions/audioPlayerActions';

interface PropsType {
  menuItemInfo: SheetMenuItemType; // 歌单
  isCollapseMenu: boolean; // 是否折叠
}

/**
 * @description: 个人歌单item组件
 */
const SheetMenu: React.FC<PropsType> = ({ menuItemInfo, isCollapseMenu }) => {
  const dispatch = useDispatch();
  const { activeSheet, sheetSongListMap } = useSelector(
    (state: RootState) => ({
      activeSheet: state.mainMenu.activeSheet,
      sheetSongListMap: state.mainMenu.sheetSongListMap,
      activeSongId: state.playerControl.activeSongId,
    }),
    shallowEqual,
  );

  // 当前歌单对应的歌曲列表
  const curSongList = useMemo(() => {
    return sheetSongListMap[menuItemInfo.sheetId] || [];
  }, [menuItemInfo.sheetId, sheetSongListMap]);

  // 当前歌单中的第一首歌的封面作为歌单的封面
  const firstSongPic = useMemo(() => {
    const song = curSongList?.length ? curSongList[0] : {};
    return song?.songPic || defaultPic;
  }, [curSongList]);

  // 鼠标右键--播放
  const playHandler = useCallback(() => {
    if (!curSongList?.length) return;
    const song = curSongList[Math.floor(Math.random() * curSongList.length)];
    playSong(song);
  }, [curSongList]);

  // 鼠标右键--删除
  const deleteHandler = useCallback(async () => {
    await handleDeleteSheet(menuItemInfo.sheetId);
  }, [menuItemInfo]);

  // 鼠标右键--重命名
  const renameHandler = useCallback(() => {
    console.log('重命名');
  }, []);

  // 鼠标右键菜单
  const menu = useMemo(() => {
    return [
      {
        label: '播放',
        onClick: playHandler,
        icon: 'icon-bofang1',
        disabled: !curSongList?.length,
      },
      {
        label: '删除歌单',
        onClick: deleteHandler,
        icon: 'icon-shanchu',
        disabled: menuItemInfo.sheetType === SheetTypeEnum.DEFAULT,
      },
      { label: '重命名', onClick: renameHandler, icon: 'icon-rename' },
    ];
  }, [curSongList, deleteHandler, menuItemInfo, playHandler, renameHandler]);

  // 鼠标右键
  const onContextMenuHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    clickSheet();
    Emitter.emit(EventBusEnum.ContextMenu, {
      contextMenu: menu,
      position: {
        x: event.clientX,
        y: event.clientY,
      },
    });
  };

  // 点击歌单
  const clickSheet = useCallback(async () => {
    if (menuItemInfo?.sheetId === activeSheet?.sheetId) return;
    dispatch(setActiveSheet(menuItemInfo));
    dispatch(setActiveMenu({}));
    dispatch(setCurSheetSongList([])); // 清空当前歌单的歌曲列表
    // 获取歌单对应的歌曲列表
    let songList: any[] | undefined;
    if (!curSongList.length) {
      // 歌单没有歌曲数据则请求接口
      songList = await getSongListBySheetId({
        sheetId: menuItemInfo.sheetId,
        isOnline: false,
      });
    } else {
      songList = curSongList;
    }
    dispatch(setCurSheetSongList(songList));
  }, [activeSheet?.sheetId, curSongList, dispatch, menuItemInfo]);

  return (
    <MenuItemStyles onClick={clickSheet} onContextMenu={onContextMenuHandler}>
      <div
        className={classNames(
          'item',
          isCollapseMenu ? 'item-collapse' : '',
          menuItemInfo?.sheetId === activeSheet?.sheetId ? 'item-active' : '',
        )}
      >
        <img className="song-pic" src={firstSongPic} alt="" draggable={false} />
        {!isCollapseMenu && (
          <span className="name">{menuItemInfo.sheetName}</span>
        )}
      </div>
    </MenuItemStyles>
  );
};

export default memo(SheetMenu);
