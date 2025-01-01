import { BrowserWindow, ipcMain } from 'electron';
import { WindowPositionType } from '@/types/commonTypes';
import WindowUIEvent from '../../eventNameEnum/windowUIEvent';

/**
 * @description: 窗口UI消息
 */
export const updatePositionHandler = (mainWindow: BrowserWindow) => {
  // 全屏切换
  ipcMain.on(WindowUIEvent.DRAG_APP, (event, data: WindowPositionType) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    mainWindow.setPosition(data.x, data.y);
  });
};
