import { BrowserWindow, ipcMain } from 'electron';
import WindowUIEvent from '@/InteractionEnum/windowUIEvent';
import { setWindowData, getWindowData } from '@/main/ipcMain/data/windowData';
import { WindowPositionType } from '@/types/commonTypes';

/**
 * @description: 主窗口 事件处理
 */
export const windowUIHandler = (mainWindow: BrowserWindow) => {
  /**
   *  监听 全屏、退出全屏事件
   */
  ipcMain.on(WindowUIEvent.Full_Screen, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    if (!getWindowData().isFullScreen) {
      mainWindow.setFullScreen(true);
    } else {
      mainWindow.setFullScreen(false);
    }
  });

  /**
   *   监听 窗口最大化、退出最大化
   */
  ipcMain.on(WindowUIEvent.Maximize, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
      mainWindow.on('move', handleMove);
    } else {
      // 最大化之前记录位置信息
      setWindowData({ bounds: mainWindow.getBounds() });
      // 移除move监听，最大化时会触发move
      mainWindow.off('move', handleMove);
      mainWindow.maximize();
    }
  });

  /**
   *  监听 最小化
   */
  ipcMain.on(WindowUIEvent.Minimize, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.minimize();
  });

  /**
   *  监听 销毁窗口
   */
  ipcMain.on(WindowUIEvent.Close, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.close();
  });

  /**
   * 监听 更新窗口位置
   */
  ipcMain.on(WindowUIEvent.Set_Position, (event, data: WindowPositionType) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.setPosition(data.x, data.y);
  });

  /**
   *  进入全屏时触发
   */
  mainWindow.on('enter-full-screen', () => {
    // console.log('全屏');
    setWindowData({ isFullScreen: true });
    mainWindow.webContents.send(WindowUIEvent.Full_Screen, true);
    mainWindow.setResizable(false);
  });

  /**
   *  退出全屏时触发
   */
  mainWindow.on('leave-full-screen', () => {
    // console.log('退出全屏');
    setWindowData({ isFullScreen: false });
    mainWindow.webContents.send(WindowUIEvent.Full_Screen, false);
    mainWindow.setResizable(true);
    // 退出全屏时，如果在最大化则先退出最大化，然后恢复到最大化之前的界面大小
    setTimeout(() => {
      if (getWindowData().isMaximized) {
        mainWindow.unmaximize();
      }
      const { bounds } = getWindowData();
      // @ts-ignore
      mainWindow.setBounds(bounds);
    }, 10);
  });

  /**
   *  窗口最大化时触发
   */
  mainWindow.on('maximize', () => {
    // console.log('最大化');
    setWindowData({ isMaximized: true });
    mainWindow.setResizable(false);
    mainWindow.webContents.send(WindowUIEvent.Maximize, true);
  });

  /**
   *  当窗口从最大化状态退出时触发
   */
  mainWindow.on('unmaximize', () => {
    // console.log('退出最大化');
    setWindowData({ isMaximized: false });
    mainWindow.setResizable(true);
    mainWindow.webContents.send(WindowUIEvent.Maximize, false);
  });

  /**
   *  窗口最小化时触发
   */
  mainWindow.on('minimize', () => {
    // console.log('最小化');
    setWindowData({ isMinimized: true });
    mainWindow.webContents.send(WindowUIEvent.Minimize, true);
  });

  /**
   *  当窗口从最小化状态恢复时触发
   */
  mainWindow.on('restore', () => {
    // console.log('退出最小化');
    setWindowData({ isMinimized: false });
    mainWindow.webContents.send(WindowUIEvent.Minimize, false);
  });

  /**
   *  调整窗口大小后触发
   */
  mainWindow.on('resized', () => {
    console.log('resized');
    const bounds = mainWindow.getBounds();
    setWindowData({ bounds });
  });

  /**
   *  窗口移动到新位置时触发
   */
  mainWindow.on('move', handleMove);

  function handleMove() {
    // console.log('move');
    const bounds = mainWindow.getBounds();
    setWindowData({ bounds });
  }
};
