import MenuItem from '@/renderer/views/Layout/components/MenuItem';
import { MenuItemType } from '@/renderer/views/Layout/types';
import { OnlineMenuStyles } from '@/renderer/views/Layout/LeftComps/styles/OnlineMenuStyles';

/**
 * @description: 在线音乐：音乐馆、视频、广场
 */
const onLineMenuList: MenuItemType[] = [
  { id: '001', name: '音乐馆', icon: 'icon-home' },
  { id: '002', name: '视频', icon: 'icon-video' },
  { id: '003', name: '世界', icon: 'icon-shijie' },
];

export default function OnlineMenu() {
  return (
    <OnlineMenuStyles>
      <div className="title">在线音乐</div>
      <div>
        {onLineMenuList.map((item) => {
          return <MenuItem key={item.id} menuItemInfo={item}></MenuItem>;
        })}
      </div>
    </OnlineMenuStyles>
  );
}
