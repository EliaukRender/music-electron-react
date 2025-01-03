import { BrowserWindow } from 'electron';
import { KeyboardEventEnum, KeyboardEnum } from '@/InteractionEnum/keyboardEvent';

const localshortcut = require('electron-localshortcut');

let mainWindow: BrowserWindow;
/**
 * @description: 监听窗口的键盘事件
 */
export const keyboard = (browserWindow: BrowserWindow) => {
  mainWindow = browserWindow;

  localshortcut.register(browserWindow, KeyboardEnum.Enter, () => {
    keyboardEmitter(KeyboardEnum.Enter);
  });

  localshortcut.register(browserWindow, KeyboardEnum.Space, () => {
    keyboardEmitter(KeyboardEnum.Space);
  });
};

/**
 * @description: 发送给渲染进程的事件
 */

function keyboardEmitter(data: KeyboardEnum) {
  mainWindow.webContents.send(KeyboardEventEnum.Keyboard, data);
}
