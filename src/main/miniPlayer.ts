import { app, BrowserWindow, ipcMain } from 'electron';
import WindowUIEvent from '@/InteractionEnum/windowUIEvent';
import { createBrowserWindow, resolveHtmlPath } from '@/main/util';
import path from 'path';

let miniPlayerWindow: BrowserWindow;

export const miniPlayer = () => {
  /**
   * 监听 打开mini播放器
   */
  ipcMain.on(WindowUIEvent.Mini_Player, (event, data) => {
    console.log('Mini_Player');
    // if (miniPlayerWindow) {
    //   //
    // } else {
    miniPlayerWindow = createBrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        /* 预加载脚本 */
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });
    miniPlayerWindow.loadURL(resolveHtmlPath('index.html/mini-player'));
    // }
  });
};
