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
      <LogoInfo></LogoInfo>
      <OnlineMenu></OnlineMenu>
      <SheetMenu></SheetMenu>
    </LeftAsideStyles>
  );
}
