/**
 * @description: APP首页
 */
import { HomeStyles } from './HomeStyles';
import LeftAside from '../Layout/LeftAside';
import RightContainer from '../Layout/RightContainer';

export default function Home() {
  return (
    <HomeStyles>
      <LeftAside></LeftAside>
      <RightContainer></RightContainer>
    </HomeStyles>
  );
}
