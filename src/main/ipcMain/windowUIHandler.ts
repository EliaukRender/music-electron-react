/**
 * @description: 窗口UI消息
 */
import { BrowserWindow, ipcMain } from 'electron';
import WindowUIEvent from '../../eventNameEnum/windowUIEvent';

const uiStateData = {
  isFullScreen: false, // 主窗口的全屏状态
};

export const windowUIHandler = (mainWindow: BrowserWindow) => {
  // 全屏切换
  ipcMain.on(WindowUIEvent.FULL_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.setFullScreen(!uiStateData.isFullScreen);
  });

  // 主窗口进入全屏
  mainWindow.on('enter-full-screen', () => {
    uiStateData.isFullScreen = true;
  });

  // 主窗口退出全屏
  mainWindow.on('leave-full-screen', () => {
    uiStateData.isFullScreen = false;
  });

  // 最大化
  ipcMain.handle(WindowUIEvent.MAX_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    const isMax = mainWindow.isMaximized();
    console.log('isMax', isMax);
    if (isMax) {
      mainWindow.unmaximize();
      return false;
    }
    mainWindow.maximize();
    return true;
  });

  // 最小化
  ipcMain.on(WindowUIEvent.MIN_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.minimize();
  });

  // 关闭APP
  ipcMain.on(WindowUIEvent.CLOSE_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.close();
  });
};
