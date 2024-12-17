/**
 * @description: 窗口UI消息
 */
import { BrowserWindow, ipcMain } from 'electron';
import WindowUIEvent from '../../eventNameEnum/windowUIEvent';

export const windowUIHandler = (mainWindow: BrowserWindow) => {
  // 全屏切换
  ipcMain.on(WindowUIEvent.FULL_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });

  // 最大化
  ipcMain.on(WindowUIEvent.MAX_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.maximize();
  });

  // 最小化
  ipcMain.on(WindowUIEvent.MIN_APP, (event, data) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.unmaximize();
  });
};
