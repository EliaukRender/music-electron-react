/**
 * @description: APP首页
 */
import LeftAside from './components/LeftAside';
import RightContainer from './components/RightContainer';
import { useEffect } from 'react';
import { initAppMenuData } from '@/renderer/store/actions/mainMenuActions';
import { LayoutStyles } from '@/renderer/views/Layout/styles/LayoutStyles';

export default function Layout() {
  useEffect(() => {
    initAppMenuData(); // 初始化app的菜单数据
  });

  return (
    <LayoutStyles>
      <LeftAside></LeftAside>
      <RightContainer></RightContainer>
    </LayoutStyles>
  );
}
