import LogoInfo from '@/renderer/views/Layout/LeftComps/LogoInfo';
import OnlineMenu from '@/renderer/views/Layout/LeftComps/OnlineMenu';
import SheetMenu from '@/renderer/views/Layout/LeftComps/SheetMenu';
import { LeftAsideStyles } from './styles/LeftAsideStyles';

/**
 * @description: APP左侧区域
 */
export default function LeftAside() {
  return (
    <LeftAsideStyles>
      {/* logo */}
      <LogoInfo></LogoInfo>
      {/* 在线音乐 */}
      <OnlineMenu></OnlineMenu>
      {/* 我的歌单 */}
      <SheetMenu></SheetMenu>
    </LeftAsideStyles>
  );
}
