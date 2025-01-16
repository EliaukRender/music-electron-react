import LeftAside from './components/LeftAside';
import RightContainer from './components/RightContainer';
import React, { memo, useEffect } from 'react';
import { initAppData } from '@/renderer/store/actions/mainMenuActions';
import { LayoutStyles } from '@/renderer/views/Layout/styles/LayoutStyles';
import LyricFullScreen from '@/renderer/views/LyricFullScreen';
import { windowUiHandler } from '@/renderer/ipcRenderer/mainWindow/windowUi';
import { KeyboardHandler } from '@/renderer/ipcRenderer/mainWindow/keyboard';
import { useNavigate } from 'react-router-dom';
import { RouteEnum } from '@/renderer/constant/routeEnum';
import ContextMenu from '@/renderer/views/ContextMenu/ContextMenu';
import { useContextMenu } from '@/renderer/hooks/useContextMenu';
import { usePreDragImage } from '@/renderer/hooks/usePreDragImage';

/**
 *  APP首页--框架入口
 */
function Layout() {
  usePreDragImage();
  /**
   * 鼠标右键hooks
   */
  const { x, y, menu, contextMenuVisible, hideContextMenu } = useContextMenu();

  /**
   *  监听主线程消息
   */
  useEffect(() => {
    windowUiHandler();
    KeyboardHandler();
    initAppData(); // 初始化app的菜单数据
  }, []);

  /**
   * 默认路由跳转到我的歌单
   */
  const navigate = useNavigate();
  useEffect(() => {
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
