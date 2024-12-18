import { LogoInfoStyles } from './styles/LogoInfoStyles';

export default function LogoInfo() {
  return (
    <LogoInfoStyles>
      <img
        className="img"
        src={require('@/renderer/assets/images/music-logo.png')}
        alt=""
      />
      <span className="title">Eliauk音乐</span>
    </LogoInfoStyles>
  );
}
