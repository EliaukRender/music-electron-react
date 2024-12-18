import { MenuItemStyles } from '@/renderer/views/Layout/components/styles/MenuItemStyles';
import React, { memo } from 'react';
import { MenuItemType } from '@/renderer/views/Layout/types';
import classNames from 'classnames';

interface PropsType {
  menuItemInfo: MenuItemType;
}

/**
 * @description:  菜单item组件
 */
const MenuItem: React.FC<PropsType> = ({ menuItemInfo }) => {
  return (
    <MenuItemStyles>
      <i className={classNames('iconfont', menuItemInfo.icon)}></i>
      <span className="name">{menuItemInfo.name}</span>
    </MenuItemStyles>
  );
};

export default memo(MenuItem);
