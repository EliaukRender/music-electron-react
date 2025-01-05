import { MenuItemStyles } from '@/renderer/views/components/MenuItem/MenuItemStyles';
import React, { memo } from 'react';
import classNames from 'classnames';
import { OnlineMenuItemType } from '@/renderer/types/menuTypes';
import {
  setActiveMenu,
  setActiveSheet,
} from '@/renderer/store/modules/mainMenuReducer';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/renderer/store';

interface PropsType {
  menuItemInfo: OnlineMenuItemType; // 在线菜单
  isCollapseMenu: boolean; // 是否折叠
}

/**
 * @description:  在线菜单item组件
 */
const OnlineMenu: React.FC<PropsType> = ({ menuItemInfo, isCollapseMenu }) => {
  const dispatch = useDispatch();
  const { activeMenu } = useSelector(
    (state: RootState) => ({
      activeMenu: state.mainMenu.activeMenu,
    }),
    shallowEqual,
  );

  // 点击菜单
  const clickMenu = () => {
    if (menuItemInfo.menuId === activeMenu?.menuId) return;
    dispatch(setActiveMenu(menuItemInfo));
    dispatch(setActiveSheet({}));
  };

  return (
    <MenuItemStyles
      onClick={clickMenu}
      className={classNames(
        menuItemInfo.menuId === activeMenu?.menuId ? 'active' : '',
      )}
    >
      <div
        className={classNames(
          'item',
          isCollapseMenu ? 'item-collapse' : '',
          menuItemInfo.menuId === activeMenu?.menuId ? 'item-active' : '',
        )}
      >
        <i className={classNames('iconfont', menuItemInfo?.menuIcon)}></i>
        {!isCollapseMenu && (
          <span className="name">{menuItemInfo.menuName}</span>
        )}
      </div>
    </MenuItemStyles>
  );
};

export default memo(OnlineMenu);
