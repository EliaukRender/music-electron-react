/**
 * @description: APP首页
 */
import { HomeStyles } from './HomeStyles';
import LeftAside from '../Layout/LeftAside';
import RightContainer from '../Layout/RightContainer';
import { useEffect } from 'react';
import { initAppMenuData } from '@/renderer/store/actions/mainMenuActions';

export default function Home() {
  useEffect(() => {
    initAppMenuData(); // 初始化app的菜单数据
  });

  return (
    <HomeStyles>
      <LeftAside></LeftAside>
      <RightContainer></RightContainer>
    </HomeStyles>
  );
}
