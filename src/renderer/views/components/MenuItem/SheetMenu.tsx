import { MenuItemStyles } from '@/renderer/views/components/MenuItem/MenuItemStyles';
import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import { SheetMenuItemType } from '@/renderer/types/menuTypes';
import {
  setActiveMenu,
  setActiveSheet,
  setCurSheetSongList,
} from '@/renderer/store/modules/mainMenuReducer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { getSongListBySheetId } from '@/renderer/store/actions/mainMenuActions';
import defaultPic from '@/renderer/assets/images/music-info.png';

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
    }),
    shallowEqual,
  );

  // 当前歌单对应的歌曲列表
  const curSongList = useMemo(() => {
    return sheetSongListMap[menuItemInfo.sheetId] || [];
  }, [menuItemInfo, sheetSongListMap]);

  // 当前歌单中的第一首歌的封面作为歌单的封面
  const firstSongPic = useMemo(() => {
    const song = curSongList?.length ? curSongList[0] : {};
    return song?.songPic || defaultPic;
  }, [curSongList]);

  // 点击歌单
  const clickSheet = async () => {
    if (menuItemInfo?.sheetId === activeSheet?.sheetId) return;
    dispatch(setActiveSheet(menuItemInfo));
    dispatch(setActiveMenu({}));
    dispatch(setCurSheetSongList([])); // 清空当前歌单的歌曲列表
    // 获取歌单对应的歌曲列表
    let songList: any[] | undefined;
    if (!curSongList) {
      // 歌单没有歌曲数据则请求接口
      songList = await getSongListBySheetId({
        sheetId: menuItemInfo.sheetId,
        isOnline: false,
      });
    } else {
      songList = curSongList;
    }
    dispatch(setCurSheetSongList(songList));
  };

  return (
    <MenuItemStyles onClick={clickSheet}>
      <div
        className={classNames(
          'item',
          isCollapseMenu ? 'item-collapse' : '',
          menuItemInfo?.sheetId === activeSheet?.sheetId ? 'item-active' : '',
        )}
      >
        <img className="song-pic" src={firstSongPic} alt="" />
        {!isCollapseMenu && (
          <span className="name">{menuItemInfo.sheetName}</span>
        )}
      </div>
    </MenuItemStyles>
  );
};

export default memo(SheetMenu);
