import { BrowserWindow, ipcMain } from 'electron';
import WindowUIEvent from '../../eventNameEnum/windowUIEvent';
import { getShareData, setShareData } from '@/main/ipcMain/shareData';

/**
 * @description: 全屏、最大最小化、关闭APP
 */
export const windowUIHandler = (mainWindow: BrowserWindow) => {
  /**
   *  监听全屏、退出全屏事件
   */
  ipcMain.on(WindowUIEvent.FULL_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.setFullScreen(!getShareData().isFullScreen);
  });

  /**
   *  进入全屏
   */
  mainWindow.on('enter-full-screen', () => {
    setShareData({ isFullScreen: true });
    mainWindow.setResizable(false);
  });

  /**
   *  退出全屏
   */
  mainWindow.on('leave-full-screen', () => {
    setShareData({ isFullScreen: false });
    mainWindow.setBounds({
      width: getShareData().width,
      height: getShareData().height,
    });
    mainWindow.setResizable(true);
  });

  /**
   *   窗口最大化、退出最大化
   */
  ipcMain.handle(WindowUIEvent.MAX_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    const isMax = mainWindow.isMaximized();
    if (isMax) {
      mainWindow.unmaximize();
      mainWindow.setResizable(true);
      setShareData({ isMaximized: false });
      return false;
    }
    const [x, y] = mainWindow.getPosition();
    const bound = mainWindow.getBounds();
    setShareData({ x, y, width: bound.width, height: bound.height });
    mainWindow.maximize();
    mainWindow.setResizable(false);
    setShareData({ isMaximized: true });
    return true;
  });

  /**
   *  最小化
   */
  ipcMain.on(WindowUIEvent.MIN_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.minimize();
    setShareData({ isMinimized: true });
  });

  /**
   *  关闭APP
   */
  ipcMain.on(WindowUIEvent.CLOSE_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.close();
  });
};
