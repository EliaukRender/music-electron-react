/* eslint global-require: off, no-console: off, promise/always-return: off */
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow, Tray, Menu } from 'electron';
import { mainWinKeyboardHandler } from '@/main/ipcMain/mainWin/keyboardHandler';
import { mainWinMusicControlHandler } from '@/main/ipcMain/mainWin/musicControlHandler';
import { mainWinUiHandler } from '@/main/ipcMain/mainWin/winUihandler';
import path from 'path';
import { resolveHtmlPath } from '@/main/util';
import { setMainWindowData } from '@/main/ipcMain/appData/mainWinData';
import {
  installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-extension-installer';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { RouteEnum } from '@/renderer/constant/routeEnum';
import { isDebug } from '@/main/processEnv';
import {
  getMiniPlayerWinBounds,
  miniWinListener,
} from '@/main/ipcMain/miniPlayerWin/winUiHandler';
import { miniWinKeyboardListener } from '@/main/ipcMain/miniPlayerWin/keyboardHandler';
import { MiniPlayerEnum } from '@/main/ipcMain/constant';

// 生产环境下安装并启用源映射支持
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// 获取静态资源路径
const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

// APP更新
class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

/**
 *  安装拓展工具: react开发工具、redux
 */
const installExtensions = async () => {
  try {
    console.log('---installExtensions start---');
    await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS], {
      loadExtensionOptions: {
        allowFileAccess: true,
      },
    });
  } catch (err) {
    console.log('---installExtensions-error---', err);
  }
};

/**
 *  窗口
 */
let mainWindow: BrowserWindow | null; // 主窗口
let miniPlayerWindow: BrowserWindow | null; // mini-player窗口

/**
 *  创建窗口
 */
const createWindow = async () => {
  // 安装拓展工具
  if (isDebug) {
    await installExtensions();
  }

  /**
   *  主窗口
   */
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1100,
    minHeight: 700,
    frame: false, // 隐藏窗口的工具栏
    transparent: true, // 窗口是否透明
    icon: getAssetPath('icon.png'),
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      /* 预加载脚本 */
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath());

  mainWindow.once('ready-to-show', () => {
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

  // 主窗口销毁时，所有窗口全部被销毁
  mainWindow.once('closed', () => {
    mainWindow = null;
    BrowserWindow.getAllWindows()?.forEach((window) => {
      window?.close();
    });
  });

  /**
   * mini-player窗口
   */
  miniPlayerWindow = new BrowserWindow({
    width: MiniPlayerEnum.Win_Width,
    height: MiniPlayerEnum.Win_Height,
    // width: 1000,
    // height: 500,
    skipTaskbar: true, // 窗口不出现在任务栏上
    frame: false, // 隐藏窗口的工具栏
    transparent: true, // 窗口是否透明
    alwaysOnTop: true, // 设置窗口始终置顶
    resizable: isDebug, // 是否可以设置窗口大小
    icon: getAssetPath('icon.png'),
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      /* 预加载脚本 */
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  miniPlayerWindow.loadURL(resolveHtmlPath(RouteEnum.MiniPlayer)); // 加载mini-player页面

  const bounds = getMiniPlayerWinBounds(miniPlayerWindow);

  miniPlayerWindow.once('ready-to-show', () => {
    if (!miniPlayerWindow) {
      throw new Error('miniPlayerWindow is not defined');
    }
    miniPlayerWindow.show();
    // @ts-ignore
    miniPlayerWindow.setBounds(bounds); // 设置到屏幕右下角
    miniPlayerWindow.minimize(); // 最小化
  });

  miniPlayerWindow.once('closed', () => {
    miniPlayerWindow = null;
  });

  /**
   *
   */

  /**
   * 其他操作: APP自动更新
   */
  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater(); // app自动更新
};

/**
 * 单实例运行
 */
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit(); // 停止新实例
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
        mainWindow.focus();
      }
    }
  });
}

/**
 * app准备就绪
 */
app
  .whenReady()
  .then(async () => {
    // 创建窗口
    await createWindow();

    // 监听main窗口事件
    mainWinKeyboardHandler(mainWindow);
    mainWinMusicControlHandler(mainWindow);
    mainWinUiHandler(mainWindow, miniPlayerWindow);

    // 监听mini窗口事件
    miniWinListener(miniPlayerWindow);
    miniWinKeyboardListener(miniPlayerWindow);

    setTray();

    // App激活的时候
    app.on('activate', async () => {
      if (mainWindow === null) await createWindow();
    });
  })
  .catch((err) => console.log('error app whenReady', err));

/**
 *  app所有窗口被关闭
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    tray?.destroy();
    app.quit();
  }
});

/**
 * 系统托盘
 */
let tray: Tray | null = null;
function setTray() {
  // 创建系统托盘图标
  tray = new Tray(getAssetPath('icon.png')); // 托盘图标
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      click: () => {
        mainWindow?.show();
      },
    },
    {
      label: '退出',
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip('Eliauk音乐');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) {
      mainWindow?.restore();
      mainWindow.setSkipTaskbar(false); // 任务栏显示图标
    } else {
      mainWindow.minimize();
      mainWindow.setSkipTaskbar(true); // 任务栏隐藏图标
    }
  });
}
