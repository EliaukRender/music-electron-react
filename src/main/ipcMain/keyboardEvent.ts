import { BrowserWindow } from 'electron';
import { KeyboardEnum, KeyboardEvent } from '@/InteractionEnum/keyboardEnum';

const localshortcut = require('electron-localshortcut');

/**
 * @description: 监听键盘事件
 */
export const keyboardEvent = (mainWindow: BrowserWindow) => {
  localshortcut.register(mainWindow, KeyboardEnum.Enter, () => {
    mainWindow.webContents.send(
      KeyboardEvent.KeyboardEvent,
      KeyboardEnum.Enter,
    );
  });

  localshortcut.register(mainWindow, KeyboardEnum.Space, () => {
    mainWindow.webContents.send(
      KeyboardEvent.KeyboardEvent,
      KeyboardEnum.Space,
    );
  });
};
