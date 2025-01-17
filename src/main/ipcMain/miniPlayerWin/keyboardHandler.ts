import { BrowserWindow } from 'electron';
import { KeyboardEnum } from '@/main/ipcMain/ipcEventEnum/keyboard';
import { openCloseDevTools, reloadWebContent } from '@/main/util';
import localshortcut from 'electron-localshortcut';

/**
 *  【主窗口】事件监听中心
 *  该文件主要监听主窗口的快捷键操作
 */
export const miniWinKeyboardListener = (
  miniPlayerWin: BrowserWindow | null,
) => {
  if (!miniPlayerWin) return;

  localshortcut.register(miniPlayerWin, KeyboardEnum.F12, () => {
    openCloseDevTools(miniPlayerWin);
  });

  localshortcut.register(miniPlayerWin, KeyboardEnum.F5, () => {
    reloadWebContent(miniPlayerWin);
  });
};
