/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import {
  installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-extension-installer';
import MenuBuilder from './menu';
import { createBrowserWindow, resolveHtmlPath } from './util';
import { setMainWindowData } from '@/main/mainWindow/windowData';
import { mainWindowListener } from '@/main/mainWindow/handler';
import { mainWinKeyboardListener } from '@/main/mainWindow/handler/keyboard';
import {
  createMiniPlayerWindow,
  miniPlayerWinListener,
} from '@/main/miniPlayer/handler';
import { RouteEnum } from '@/renderer/constant/routeEnum';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
console.log('---isDebug---', isDebug);

if (isDebug) {
  require('electron-debug')();
}

/**
 *  安装拓展工具: react开发工具、redux
 */
const installExtensions = async () => {
  try {
    console.log('----installExtensions start----');
    await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS], {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    });
  } catch (err) {
    console.log('installExtensions-error', err);
  }
};

/**
 *  创建窗口实例
 */
const createMainWin = async () => {
  if (isDebug) {
    await installExtensions();
  }

  // 主窗口
  mainWindow = createBrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1100,
    minHeight: 700,
  });

  mainWindow.loadURL(resolveHtmlPath());

  // ready-to-show事件后显示窗口将没有视觉闪烁
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      setMainWindowData({ bounds: mainWindow.getBounds() });
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater(); // app自动更新
};

/**
 * 监听所有的窗口都被关闭
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    // 1、创建主窗口
    createMainWin()
      .then(() => {
        mainWindowListener(mainWindow!);
        mainWinKeyboardListener(mainWindow!);
      })
      .catch((err) => {
        console.log('createMainWin error!', err);
      });

    /// 2、创建mini-player窗口
    const miniPlayerWindow = createMiniPlayerWindow();

    // App激活的时候
    app.on('activate', () => {
      if (mainWindow === null) createMainWin();
      if (miniPlayerWindow === null) createMiniPlayerWindow();
    });
  })
  .catch(console.log);
