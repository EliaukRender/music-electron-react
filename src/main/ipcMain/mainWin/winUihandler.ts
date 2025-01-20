import { BrowserWindow, ipcMain } from 'electron';
import MainWinUi from '@/main/ipcMain/ipcEventEnum/main_winUi';
import {
  setMainWindowData,
  getMainWindowData,
} from '@/main/ipcMain/appData/mainWinData';
import { WindowPositionType } from '@/types/commonTypes';
import { getScreenWidthHeight } from '@/main/util';
import { MiniPlayerEventEnum } from '@/main/ipcMain/ipcEventEnum/mini_events';
import { getMiniPlayerWinData } from '@/main/ipcMain/appData/miniWinData';

/**
 *  主窗口 事件监听
 *  监听主窗口UI相关的一些事件：最小化、最小化、全屏、mini播放器
 */
export const mainWinUiHandler = (
  mainWin: BrowserWindow | null,
  miniPlayerWin: BrowserWindow | null,
) => {
  if (!mainWin) return;
  /**
   *  全屏、退出全屏事件
   */
  ipcMain.on(MainWinUi.Full_Screen, () => {
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
  ipcMain.on(MainWinUi.Maximize, () => {
    if (!mainWin) {
      console.error('窗口不存在');
      return;
    }
    console.log('最大化', mainWin.isMaximized());
    if (mainWin.isMaximized()) {
      mainWin.unmaximize();
      mainWin.on('move', () => {
        handleMove(mainWin);
      });
    } else {
      setMainWindowData({ bounds: mainWin.getBounds() }); // 最大化之前，记录窗口信息
      // 最大化之前，移除move监听
      mainWin.off('move', () => {
        handleMove(mainWin);
      });
      mainWin.maximize();
      mainWin.webContents.send(
        MainWinUi.Maximize,
        getMainWindowData().isMaximized,
      );
    }
  });

  /**
   *  最小化
   */
  ipcMain.on(MainWinUi.Minimize, () => {
    if (!mainWin) {
      console.error('窗口不存在');
      return;
    }
    mainWin.minimize();
  });

  /**
   *  销毁窗口
   */
  ipcMain.on(MainWinUi.Close, () => {
    if (!mainWin) {
      console.error('窗口不存在');
      return;
    }
    mainWin.close();
  });

  /**
   *  更新窗口位置信息
   */
  ipcMain.on(MainWinUi.Set_Position, (event, data: WindowPositionType) => {
    if (!mainWin) {
      console.error('窗口不存在');
      return;
    }
    const { screenWidth, screenHeight } = getScreenWidthHeight();
    // todo 考虑多显示器场景
    const { bounds } = getMainWindowData();
    if (data.y < -10) return; // 上
    if (screenHeight - data.y <= 90) return; // 下
    if (data.x < -(bounds!.width * 0.7)) return; // 左
    if (screenWidth - data.x < bounds!.width * 0.3) return; // 右
    mainWin.setPosition(data.x, data.y);
    // console.log(data.x, data.y);
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
    const bounds = mainWin.getBounds();
    setMainWindowData({ bounds });
  });

  /**
   *  窗口移动到新位置时触发
   */
  mainWin.on('move', () => {
    handleMove(mainWin);
  });

  mainWin.on('focus', () => {
    console.log('focus');
  });

  /**
   *  显示或隐藏 mini-player窗口
   */
  ipcMain.on(MiniPlayerEventEnum.Show_Hidden_Mini_Player, (event, data) => {
    if (!miniPlayerWin) return;
    if (miniPlayerWin.isVisible()) {
      miniPlayerWin.minimize();
    } else {
      miniPlayerWin.setPosition(
        getMiniPlayerWinData().bounds.x,
        getMiniPlayerWinData().bounds.y,
      );
      miniPlayerWin.restore();
    }
  });

  /**
   *   更新mini-player窗口中的数据
   */
  ipcMain.on(MiniPlayerEventEnum.Update_Mini_Player_Data, (event, data) => {
    if (!miniPlayerWin) return;
    miniPlayerWin.webContents.send(
      MiniPlayerEventEnum.Update_Mini_Player_Data,
      data,
    );
  });
};

// ====================================

// 窗口move时保存窗口信息
function handleMove(mainWin: BrowserWindow) {
  const bounds = mainWin.getBounds();
  setMainWindowData({ bounds });
}

function fullScreen(mainWin: BrowserWindow) {
  mainWin.webContents.send(
    MainWinUi.Full_Screen,
    getMainWindowData().isFullScreen,
  );
}

// 是否最大化
function maximize(mainWin: BrowserWindow) {
  mainWin.webContents.send(MainWinUi.Maximize, getMainWindowData().isMaximized);
}

// 是否最小化
function minimize(mainWin: BrowserWindow) {
  mainWin.webContents.send(MainWinUi.Minimize, getMainWindowData().isMinimized);
}