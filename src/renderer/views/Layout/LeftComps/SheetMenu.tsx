/**
 * @description: 我的歌单：歌单菜单
 */

import MenuItem from '@/renderer/views/components/MenuItem/MenuItem';
import { MenuItemType } from '@/renderer/views/Layout/types';
import { SheetMenuStyles } from '@/renderer/views/Layout/LeftComps/styles/SheetMenuStyles';
import { memo } from 'react';

const sheetMenuList: MenuItemType[] = [
  { id: '004', name: '喜欢', icon: 'icon-home' },
  { id: '005', name: '睡觉', icon: 'icon-shuijiao' },
  { id: '006', name: '运动', icon: 'icon-wangqiu' },
  { id: '007', name: '热歌', icon: 'icon-huore' },
];

function SheetMenu() {
  return (
    <SheetMenuStyles>
      <div className="title-box">
        <div className="title">我的歌单</div>
        <i className="iconfont icon-jia"></i>
      </div>
      <div>
        {sheetMenuList.map((item) => {
          return <MenuItem key={item.id} menuItemInfo={item}></MenuItem>;
        })}
      </div>
    </SheetMenuStyles>
  );
}

export default memo(SheetMenu);
