/**
 * @description: 窗口UI消息
 */
import { BrowserWindow, ipcMain } from 'electron';
import { WindowPositionType } from '@/types/commonTypes';
import WindowUIEvent from '../../eventNameEnum/windowUIEvent';

export const updatePositionHandler = (mainWindow: BrowserWindow) => {
  // 全屏切换
  ipcMain.on(WindowUIEvent.DRAG_APP, (event, data: WindowPositionType) => {
    if (!mainWindow) {
      console.error('窗口不存在');
      return;
    }
    // 最大化窗口拖拽时先恢复窗口
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
      // todo 通知渲染进程
      return;
    }
    // todo 拖拽的位置信息最好electron自己获取
    mainWindow.setPosition(data.x, data.y);
  });
};
