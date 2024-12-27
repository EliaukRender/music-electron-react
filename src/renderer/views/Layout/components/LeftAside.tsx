import LogoInfo from '@/renderer/views/Layout/components/LogoInfo';
import LeftOnlineMenu from '@/renderer/views/Layout/components/LeftOnlineMenu';
import LeftSheetMenu from '@/renderer/views/Layout/components/LeftSheetMenu';
import { LeftAsideStyles } from '../styles/LeftAsideStyles';

/**
 * @description: APP左侧区域
 */
export default function LeftAside() {
  return (
    <LeftAsideStyles>
      {/* logo */}
      <LogoInfo></LogoInfo>
      <div className="menu">
        {/* 在线音乐 */}
        <LeftOnlineMenu></LeftOnlineMenu>
        {/* 我的歌单 */}
        <LeftSheetMenu></LeftSheetMenu>
      </div>
    </LeftAsideStyles>
  );
}
