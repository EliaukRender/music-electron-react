import { BrowserWindow } from 'electron';
import {
  KeyboardEnum,
  KeyboardEventEnum,
} from '@/main/ipcMain/ipcEventEnum/keyboard';
import localshortcut from 'electron-localshortcut';
import { openCloseDevTools, reloadWebContent } from '@/main/util';

/**
 *  【主窗口】事件监听中心
 *  该文件主要监听主窗口的快捷键操作
 */
export const mainWinKeyboardHandler = (mainWin: BrowserWindow | null) => {
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

  localshortcut.register(mainWin, KeyboardEnum.F12, () => {
    openCloseDevTools(mainWin);
  });

  localshortcut.register(mainWin, KeyboardEnum.F5, () => {
    reloadWebContent(mainWin);
  });
};
