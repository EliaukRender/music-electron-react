import { OnlineMenuStyles } from '@/renderer/views/Layout/styles/OnlineMenuStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import OnlineMenu from '@/renderer/views/components/MenuItem/OnlineMenu';

/**
 * @description: 在线音乐：音乐馆、视频、广场
 */

export default function LeftOnlineMenu() {
  const { onlineMenuList, isCollapseMenu } = useSelector(
    (state: RootState) => ({
      onlineMenuList: state.mainMenu.onlineMenuList,
      isCollapseMenu: state.mainMenu.isCollapseMenu,
    }),
    shallowEqual,
  );

  return (
    <OnlineMenuStyles>
      <div
        className="title"
        style={{ display: isCollapseMenu ? 'none' : 'block' }}
      >
        在线音乐
      </div>
      <div>
        {onlineMenuList?.map((item: any) => {
          return (
            <OnlineMenu key={item.menuId} menuItemInfo={item}></OnlineMenu>
          );
        })}
      </div>
    </OnlineMenuStyles>
  );
}
