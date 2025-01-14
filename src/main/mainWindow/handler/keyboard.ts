import { BrowserWindow } from 'electron';
import {
  KeyboardEnum,
  KeyboardEventEnum,
} from '@/main/mainWindow/eventEnum/keyboardEvent';

const localshortcut = require('electron-localshortcut');

/**
 *  【主窗口】事件监听中心
 *  该文件主要监听主窗口的快捷键操作
 */
export const mainWinKeyboardListener = (mainWin: BrowserWindow | null) => {
  if (!mainWin) return;

  localshortcut.register(mainWin, KeyboardEnum.Enter, () => {
    mainWin.webContents.send(KeyboardEventEnum.Keyboard, KeyboardEnum.Enter);
  });

  localshortcut.register(mainWin, KeyboardEnum.Space, () => {
    mainWin.webContents.send(KeyboardEventEnum.Keyboard, KeyboardEnum.Space);
  });

  localshortcut.register(mainWin, KeyboardEnum.Esc, () => {
    mainWin.webContents.send(KeyboardEventEnum.Keyboard, KeyboardEnum.Esc);
  });
};
