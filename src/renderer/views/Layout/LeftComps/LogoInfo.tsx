import { LogoInfoStyles } from './styles/LogoInfoStyles';
import { useUpdateWindowPosition } from '@/renderer/hooks/useUpdateWindowPosition';

/**
 * @description: Logo区域
 */
export default function LogoInfo() {
  const { dragEleRef } = useUpdateWindowPosition();

  return (
    <LogoInfoStyles ref={dragEleRef}>
      <img
        className="img"
        src={require('@/renderer/assets/images/music-logo.png')}
        alt=""
      />
      <span className="title">Eliauk音乐</span>
    </LogoInfoStyles>
  );
}
