import LogoInfo from '@/renderer/views/Layout/LeftComps/LogoInfo';
import LeftOnlineMenu from '@/renderer/views/Layout/LeftComps/LeftOnlineMenu';
import LeftSheetMenu from '@/renderer/views/Layout/LeftComps/LeftSheetMenu';
import { LeftAsideStyles } from './styles/LeftAsideStyles';

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
