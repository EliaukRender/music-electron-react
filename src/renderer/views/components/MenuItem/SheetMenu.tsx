import { MenuItemStyles } from '@/renderer/views/components/MenuItem/MenuItemStyles';
import React, { memo } from 'react';
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
import { useNavigate } from 'react-router-dom';

interface PropsType {
  menuItemInfo: SheetMenuItemType; // 歌单
  isCollapseMenu: boolean; // 是否折叠
}

/**
 * @description: 个人歌单item组件
 */
const SheetMenu: React.FC<PropsType> = ({ menuItemInfo, isCollapseMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeSheet } = useSelector(
    (state: RootState) => ({
      activeSheet: state.mainMenu.activeSheet,
    }),
    shallowEqual,
  );

  // 点击歌单
  const clickSheet = () => {
    dispatch(setActiveSheet(menuItemInfo));
    dispatch(setActiveMenu({}));

    dispatch(setCurSheetSongList([])); // 清空当前歌单的歌曲列表
    // 获取歌单对应的歌曲列表
    getSongListBySheetId({
      sheetId: menuItemInfo.sheetId,
      isOnline: false,
    });
    // 路由跳转
    navigate('/sheet');
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
        <i className={classNames('iconfont', menuItemInfo.sheetIcon)}></i>
        {!isCollapseMenu && (
          <span className="name">{menuItemInfo.sheetName}</span>
        )}
      </div>
    </MenuItemStyles>
  );
};

export default memo(SheetMenu);
