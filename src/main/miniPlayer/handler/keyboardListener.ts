import { BrowserWindow } from 'electron';
import {
  KeyboardEnum,
  KeyboardEventEnum,
} from '@/main/mainWindow/eventEnum/keyboardEvent';
import { openCloseDevTools, reloadWebContent } from '@/main/util';
import localshortcut from 'electron-localshortcut';

/**
 *  【主窗口】事件监听中心
 *  该文件主要监听主窗口的快捷键操作
 */
export const miniPlayerWinKeyboardListener = (
  miniPlayerWin: BrowserWindow | null,
) => {
  if (!miniPlayerWin) return;

  localshortcut.register(miniPlayerWin, KeyboardEnum.Enter, () => {
    miniPlayerWin.webContents.send(
      KeyboardEventEnum.Keyboard,
      KeyboardEnum.Enter,
    );
  });

  localshortcut.register(miniPlayerWin, KeyboardEnum.Space, () => {
    miniPlayerWin.webContents.send(
      KeyboardEventEnum.Keyboard,
      KeyboardEnum.Space,
    );
  });

  localshortcut.register(miniPlayerWin, KeyboardEnum.Esc, () => {
    miniPlayerWin.webContents.send(
      KeyboardEventEnum.Keyboard,
      KeyboardEnum.Esc,
    );
  });

  localshortcut.register(miniPlayerWin, KeyboardEnum.F12, () => {
    openCloseDevTools(miniPlayerWin);
  });

  localshortcut.register(miniPlayerWin, KeyboardEnum.F5, () => {
    reloadWebContent(miniPlayerWin);
  });
};
