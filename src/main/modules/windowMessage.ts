/**
 * @description: 监听APP窗口消息
 */
import { ipcMain } from 'electron';
import { WindowMessageEnum } from './eventName/windowMessageEnum';

export const windowMessageHandler = () => {
  // 全屏
  ipcMain.on(WindowMessageEnum.FULL_APP, (event, data) => {
    console.log('Handling Template 3 Message:', data);
  });

  // 最大化
  ipcMain.on(WindowMessageEnum.MAX_APP, (event, data) => {
    console.log('Handling Template 3 Message:', data);
  });

  // 最小化
  ipcMain.on(WindowMessageEnum.MIN_APP, (event, data) => {
    console.log('event', event, data);
  });
};
