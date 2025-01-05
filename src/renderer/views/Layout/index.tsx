import LeftAside from './components/LeftAside';
import RightContainer from './components/RightContainer';
import { useEffect } from 'react';
import { initAppData } from '@/renderer/store/actions/mainMenuActions';
import { LayoutStyles } from '@/renderer/views/Layout/styles/LayoutStyles';
import LyricFullScreen from '@/renderer/views/LyricFullScreen';
import { windowUiHandler } from '@/renderer/ipcRenderer/rendererInteraction/windowUi';
import { KeyboardHandler } from '@/renderer/ipcRenderer/rendererInteraction/keyboard';
import { useNavigate } from 'react-router-dom';
import { RouteEnum } from '@/renderer/constant/routeEnum';

/**
 * @description: APP首页--框架入口
 */
export default function Layout() {
  useEffect(() => {
    windowUiHandler();
    KeyboardHandler();
    initAppData(); // 初始化app的菜单数据
  });

  const navigate = useNavigate();
  useEffect(() => {
    navigate(RouteEnum.Sheet);
  }, [navigate]);

  return (
    <LayoutStyles>
      <LeftAside></LeftAside>
      <RightContainer></RightContainer>
      <LyricFullScreen></LyricFullScreen>
    </LayoutStyles>
  );
}
