import { MenuItemStyles } from '@/renderer/views/components/MenuItem/MenuItemStyles';
import React, { memo } from 'react';
import classNames from 'classnames';
import { SheetMenuItemType } from '@/renderer/types/menuTypes';
import {
  setActiveMenu,
  setActiveSheet,
} from '@/renderer/store/modules/mainMenuReducer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { getSongListBySheetId } from '@/renderer/store/actions/mainMenuActions';

interface PropsType {
  menuItemInfo: SheetMenuItemType; // 歌单
}

/**
 * @description: 个人歌单item组件
 */
const SheetMenu: React.FC<PropsType> = ({ menuItemInfo }) => {
  const dispatch = useDispatch();
  const { activeSheet, isCollapseMenu } = useSelector(
    (state: RootState) => ({
      activeSheet: state.mainMenu.activeSheet,
      isCollapseMenu: state.mainMenu.isCollapseMenu,
    }),
    shallowEqual,
  );

  // 点击歌单
  const clickSheet = () => {
    dispatch(setActiveSheet(menuItemInfo));
    dispatch(setActiveMenu({}));
    // 获取歌曲列表
    getSongListBySheetId({
      sheetId: menuItemInfo.sheetId,
      isOnline: false,
    });
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
