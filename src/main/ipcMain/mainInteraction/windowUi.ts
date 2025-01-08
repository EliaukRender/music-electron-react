import { BrowserWindow, ipcMain } from 'electron';
import WindowUIEvent from '@/InteractionEnum/windowUIEvent';
import { setWindowData, getWindowData } from '@/main/ipcMain/data/windowData';
import { WindowPositionType } from '@/types/commonTypes';

let mainWindow: BrowserWindow;

/**
 * @description: 主窗口 事件处理
 */
export const windowUi = (browserWindow: BrowserWindow) => {
  mainWindow = browserWindow;
  /**
   *  监听 全屏、退出全屏事件
   */
  ipcMain.on(WindowUIEvent.Full_Screen, (event, data) => {
    if (!browserWindow) {
      console.error('窗口不存在');
      return;
    }
    if (!getWindowData().isFullScreen) {
      browserWindow.setFullScreen(true);
    } else {
      browserWindow.setFullScreen(false);
    }
  });

  /**
   *   监听 窗口最大化、退出最大化
   */
  ipcMain.on(WindowUIEvent.Maximize, (event, data) => {
    if (!browserWindow) {
      console.error('窗口不存在');
      return;
    }
    if (browserWindow.isMaximized()) {
      browserWindow.unmaximize();
      browserWindow.on('move', handleMove);
    } else {
      // 最大化之前记录位置信息
      setWindowData({ bounds: browserWindow.getBounds() });
      // 移除move监听，最大化时会触发move
      browserWindow.off('move', handleMove);
      browserWindow.maximize();
    }
  });

  /**
   *  监听 最小化
   */
  ipcMain.on(WindowUIEvent.Minimize, (event, data) => {
    if (!browserWindow) {
      console.error('窗口不存在');
      return;
    }
    browserWindow.minimize();
  });

  /**
   *  监听 销毁窗口
   */
  ipcMain.on(WindowUIEvent.Close, (event, data) => {
    if (!browserWindow) {
      console.error('窗口不存在');
      return;
    }
    browserWindow.close();
  });

  /**
   * 监听 更新窗口位置
   */
  ipcMain.on(WindowUIEvent.Set_Position, (event, data: WindowPositionType) => {
    if (!browserWindow) {
      console.error('窗口不存在');
      return;
    }
    browserWindow.setPosition(data.x, data.y);
  });

  /* ==================================================================== */

  /**
   *  进入全屏时触发
   */
  browserWindow.on('enter-full-screen', () => {
    // console.log('全屏');
    setWindowData({ isFullScreen: true });
    browserWindow.setResizable(false);
    fullScreen();
  });

  /**
   *  退出全屏时触发
   */
  browserWindow.on('leave-full-screen', () => {
    // console.log('退出全屏');
    setWindowData({ isFullScreen: false });
    fullScreen();
    browserWindow.setResizable(true);
    // 退出全屏时，如果在最大化则先退出最大化，然后恢复到最大化之前的界面大小
    setTimeout(() => {
      if (getWindowData().isMaximized) {
        browserWindow.unmaximize();
      }
      const { bounds } = getWindowData();
      // @ts-ignore
      browserWindow.setBounds(bounds);
    }, 10);
  });

  /**
   *  窗口最大化时触发
   */
  browserWindow.on('maximize', () => {
    // console.log('最大化');
    setWindowData({ isMaximized: true });
    browserWindow.setResizable(false);
    maximize();
  });

  /**
   *  当窗口从最大化状态退出时触发
   */
  browserWindow.on('unmaximize', () => {
    // console.log('退出最大化');
    setWindowData({ isMaximized: false });
    browserWindow.setResizable(true);
    maximize();
  });

  /**
   *  窗口最小化时触发
   */
  browserWindow.on('minimize', () => {
    // console.log('最小化');
    setWindowData({ isMinimized: true });
    minimize();
  });

  /**
   *  当窗口从最小化状态恢复时触发
   */
  browserWindow.on('restore', () => {
    // console.log('退出最小化');
    setWindowData({ isMinimized: false });
    minimize();
  });

  /**
   *  调整窗口大小后触发
   */
  browserWindow.on('resized', () => {
    // console.log('resized');
    const bounds = browserWindow.getBounds();
    setWindowData({ bounds });
  });

  /**
   *  窗口移动到新位置时触发
   */
  browserWindow.on('move', handleMove);

  function handleMove() {
    // console.log('move');
    const bounds = browserWindow.getBounds();
    setWindowData({ bounds });
  }
};

/**
 * @description: 发送给渲染进程的事件
 */

/**
 *  是否全屏
 */
export const fullScreen = () => {
  mainWindow.webContents.send(
    WindowUIEvent.Full_Screen,
    getWindowData().isFullScreen,
  );
};

/**
 *  是否最大化
 */
export const maximize = () => {
  mainWindow.webContents.send(
    WindowUIEvent.Maximize,
    getWindowData().isMaximized,
  );
};

/**
 *  是否最小化
 */
export const minimize = () => {
  mainWindow.webContents.send(
    WindowUIEvent.Minimize,
    getWindowData().isMinimized,
  );
};
