import LeftAside from './components/LeftAside';
import RightContainer from './components/RightContainer';
import React, { memo, useEffect } from 'react';
import { initAppData } from '@/renderer/store/actions/mainMenuActions';
import { LayoutStyles } from '@/renderer/views/Layout/styles/LayoutStyles';
import LyricFullScreen from '@/renderer/views/LyricFullScreen';
import { windowUiHandler } from '@/renderer/ipcRenderer/rendererInteraction/windowUi';
import { KeyboardHandler } from '@/renderer/ipcRenderer/rendererInteraction/keyboard';
import { useNavigate } from 'react-router-dom';
import { RouteEnum } from '@/renderer/constant/routeEnum';
import ContextMenu from '@/renderer/views/ContextMenu/ContextMenu';
import { useContextMenu } from '@/renderer/hooks/useContextMenu';

/**
 * @description: APP首页--框架入口
 */
function Layout() {
  const navigate = useNavigate();
  const { x, y, menu, contextMenuVisible, hideContextMenu } = useContextMenu(); // 鼠标右键

  // 初始化数据
  useEffect(() => {
    windowUiHandler();
    KeyboardHandler();
    initAppData(); // 初始化app的菜单数据
    navigate(RouteEnum.Sheet);
  }, [navigate]);

  return (
    <LayoutStyles onContextMenu={(event) => event.preventDefault()}>
      {/* APP左侧 */}
      <LeftAside></LeftAside>
      {/* APP右侧 */}
      <RightContainer></RightContainer>
      {/* 全屏歌词组件 */}
      <LyricFullScreen></LyricFullScreen>
      {/* 鼠标右键组件 */}
      {contextMenuVisible && (
        <ContextMenu
          x={x}
          y={y}
          contextMenu={menu}
          hideContextMenu={hideContextMenu}
        ></ContextMenu>
      )}
    </LayoutStyles>
  );
}

export default memo(Layout);
