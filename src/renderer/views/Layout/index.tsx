/**
 * @description: APP首页
 */
import LeftAside from './components/LeftAside';
import RightContainer from './components/RightContainer';
import { useEffect } from 'react';
import { initAppData } from '@/renderer/store/actions/mainMenuActions';
import { LayoutStyles } from '@/renderer/views/Layout/styles/LayoutStyles';
import LyricFullScreen from '@/renderer/views/LyricFullScreen';
import { windowUiHandler } from '@/renderer/ipcRenderer/windowUIEmitter';
import { KeyboardHandler } from '@/renderer/ipcRenderer/KeyboardHandler';

export default function Layout() {
  useEffect(() => {
    windowUiHandler();
    KeyboardHandler();
    initAppData(); // 初始化app的菜单数据
  });

  return (
    <LayoutStyles>
      <LeftAside></LeftAside>
      <RightContainer></RightContainer>
      <LyricFullScreen></LyricFullScreen>
    </LayoutStyles>
  );
}
