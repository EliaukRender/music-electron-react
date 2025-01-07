import LogoInfo from '@/renderer/views/Layout/components/LogoInfo';
import LeftOnlineMenu from '@/renderer/views/Layout/components/LeftOnlineMenu';
import LeftSheetMenu from '@/renderer/views/Layout/components/LeftSheetMenu';
import { LeftAsideStyles } from '../styles/LeftAsideStyles';
import CollapseMenu from '@/renderer/views/Layout/components/CollapseMenu';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { useState } from 'react';

/**
 * @description: APP左侧区域
 */
export default function LeftAside() {
  const { isCollapseMenu } = useSelector(
    (state: RootState) => ({
      isCollapseMenu: state.mainMenu.isCollapseMenu,
    }),
    shallowEqual,
  );
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <LeftAsideStyles style={{ width: isCollapseMenu ? '80px' : '220px' }}>
      {/* logo */}
      <LogoInfo></LogoInfo>
      <div
        className={`menu ${mouseEnter ? 'menu-show-scroll-bar' : ''}`}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {/* 在线音乐 */}
        <LeftOnlineMenu></LeftOnlineMenu>
        {/* 我的歌单 */}
        <LeftSheetMenu></LeftSheetMenu>
      </div>
      {/* 操作按钮区 */}
      <div className="bottom-btn-group">
        <CollapseMenu></CollapseMenu>
      </div>
    </LeftAsideStyles>
  );
}
