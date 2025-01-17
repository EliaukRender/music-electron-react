import LeftAside from './components/LeftAside';
import RightContainer from './components/RightContainer';
import React, { memo, useEffect } from 'react';
import { initAppData } from '@/renderer/store/actions/mainMenuActions';
import { LayoutStyles } from '@/renderer/views/Layout/styles/LayoutStyles';
import LyricFullScreen from '@/renderer/views/LyricFullScreen';
import keyboardListener from '@/renderer/ipcRenderer/mainWindow/keyboardListener';
import { useNavigate } from 'react-router-dom';
import { RouteEnum } from '@/renderer/constant/routeEnum';
import ContextMenu from '@/renderer/views/ContextMenu/ContextMenu';
import { useContextMenu } from '@/renderer/hooks/useContextMenu';
import { usePreDragImage } from '@/renderer/hooks/usePreDragImage';
import { useUpdateMiniPlayerData } from '@/renderer/hooks/useUpdateMiniPlayerData';
import musicControlListener from '@/renderer/ipcRenderer/mainWindow/musicControlListener';
import winUiListener from '@/renderer/ipcRenderer/mainWindow/winUiListener';

/**
 * @description: 首页---APP入口
 */
function Layout() {
  /**
   * hooks
   */
  usePreDragImage(); // 禁止图片拖拽
  useUpdateMiniPlayerData(); // 更新mini-player数据

  /**
   * 鼠标右键hooks
   */
  const { x, y, menu, contextMenuVisible, hideContextMenu } = useContextMenu();

  /**
   *  监听主线程消息
   */
  useEffect(() => {
    winUiListener(); // 窗口事件
    keyboardListener(); // 键盘事件
    musicControlListener(); // 音乐控制事件
  }, []);

  /**
   * 初始化app数据
   */
  useEffect(() => {
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
