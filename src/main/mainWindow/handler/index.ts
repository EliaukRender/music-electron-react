import { BrowserWindow, ipcMain } from 'electron';
import WindowUIEvent from '@/main/mainWindow/eventEnum/windowUIEvent';
import {
  setMainWindowData,
  getMainWindowData,
} from '@/main/mainWindow/windowData';
import { WindowPositionType } from '@/types/commonTypes';

/**
 *  主窗口 事件监听
 *  监听主窗口UI相关的一些事件：最小化、最小化、全屏、mini播放器
 */
export const mainWindowListener = (mainWin: BrowserWindow | null) => {
  if (!mainWin) return;
  /**
   *  全屏、退出全屏事件
   */
  ipcMain.on(WindowUIEvent.Full_Screen, (event, data) => {
    if (!mainWin) {
      console.error('窗口不存在');
      return;
    }
    if (!getMainWindowData().isFullScreen) {
      mainWin.setFullScreen(true);
    } else {
      mainWin.setFullScreen(false);
    }
  });

  /**
   *   窗口最大化、退出最大化
   */
  ipcMain.on(WindowUIEvent.Maximize, (event, data) => {
    if (!mainWin) {
      console.error('窗口不存在');
      return;
    }
    if (mainWin.isMaximized()) {
      mainWin.unmaximize();
      // @ts-ignore
      mainWin.on('move', handleMove(mainWin));
    } else {
      // 最大化之前记录位置信息
      setMainWindowData({ bounds: mainWin.getBounds() });
      // 移除move监听，最大化时会触发move
      // @ts-ignore
      mainWin.off('move', handleMove(mainWin));
      mainWin.webContents.send(
        WindowUIEvent.Maximize,
        getMainWindowData().isMaximized,
      );
    }
  });

  /**
   *  最小化
   */
  ipcMain.on(WindowUIEvent.Minimize, (event, data) => {
    if (!mainWin) {
      console.error('窗口不存在');
      return;
    }
    mainWin.minimize();
  });

  /**
   *  销毁窗口
   */
  ipcMain.on(WindowUIEvent.Close, (event, data) => {
    if (!mainWin) {
      console.error('窗口不存在');
      return;
    }
    mainWin.close();
  });

  /**
   *  更新窗口位置信息
   */
  ipcMain.on(WindowUIEvent.Set_Position, (event, data: WindowPositionType) => {
    if (!mainWin) {
      console.error('窗口不存在');
      return;
    }
    mainWin.setPosition(data.x, data.y);
  });

  /**
   *  进入全屏时触发
   */
  mainWin.on('enter-full-screen', () => {
    // console.log('全屏');
    setMainWindowData({ isFullScreen: true });
    mainWin.setResizable(false);
    fullScreen(mainWin);
  });

  /**
   *  退出全屏时触发
   */
  mainWin.on('leave-full-screen', () => {
    // console.log('退出全屏');
    setMainWindowData({ isFullScreen: false });
    fullScreen(mainWin);
    mainWin.setResizable(true);
    // 退出全屏时，如果在最大化则先退出最大化，然后恢复到最大化之前的界面大小
    setTimeout(() => {
      if (getMainWindowData().isMaximized) {
        mainWin.unmaximize();
      }
      const { bounds } = getMainWindowData();
      // @ts-ignore
      mainWin.setBounds(bounds);
    }, 10);
  });

  /**
   *  窗口最大化时触发
   */
  mainWin.on('maximize', () => {
    // console.log('最大化');
    setMainWindowData({ isMaximized: true });
    mainWin.setResizable(false);
    maximize(mainWin);
  });

  /**
   *  当窗口从最大化状态退出时触发
   */
  mainWin.on('unmaximize', () => {
    // console.log('退出最大化');
    setMainWindowData({ isMaximized: false });
    mainWin.setResizable(true);
    maximize(mainWin);
  });

  /**
   *  窗口最小化时触发
   */
  mainWin.on('minimize', () => {
    // console.log('最小化');
    setMainWindowData({ isMinimized: true });
    minimize(mainWin);
  });

  /**
   *  当窗口从最小化状态恢复时触发
   */
  mainWin.on('restore', () => {
    // console.log('退出最小化');
    setMainWindowData({ isMinimized: false });
    minimize(mainWin);
  });

  /**
   *  调整窗口大小后触发
   */
  mainWin.on('resized', () => {
    // console.log('resized');
    const bounds = mainWin.getBounds();
    setMainWindowData({ bounds });
  });

  /**
   *  窗口移动到新位置时触发
   */
  mainWin.on('move', () => {
    handleMove(mainWin);
  });
};

// ====================================

// 窗口move时暂存窗口位置信息
function handleMove(mainWin: BrowserWindow) {
  const bounds = mainWin.getBounds();
  setMainWindowData({ bounds });
}

function fullScreen(mainWin: BrowserWindow) {
  mainWin.webContents.send(
    WindowUIEvent.Full_Screen,
    getMainWindowData().isFullScreen,
  );
}

// 是否最大化
function maximize(mainWin: BrowserWindow) {
  mainWin.webContents.send(
    WindowUIEvent.Maximize,
    getMainWindowData().isMaximized,
  );
}

// 是否最小化
function minimize(mainWin: BrowserWindow) {
  mainWin.webContents.send(
    WindowUIEvent.Minimize,
    getMainWindowData().isMinimized,
  );
}
