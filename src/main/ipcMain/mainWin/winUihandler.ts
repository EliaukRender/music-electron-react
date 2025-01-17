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
    if (mainWin.isMaximized()) {
      mainWin.unmaximize();
    } else {
      mainWin.maximize();
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
   *  进入全屏
   */
  mainWin.on('enter-full-screen', () => {
    // console.log('enter-full-screen:');
    setMainWindowData({ isFullScreen: true });
    mainWin.setResizable(false);
    mainWin.webContents.send(MainWinUi.Full_Screen, true);
  });

  /**
   *  退出全屏
   */
  mainWin.on('leave-full-screen', () => {
    // console.log('leave-full-screen:', getMainWindowData().bounds);
    setMainWindowData({ isFullScreen: false });
    mainWin.webContents.send(MainWinUi.Full_Screen, false);
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
   *  最大化
   */
  mainWin.on('maximize', () => {
    // console.log('最大化', getMainWindowData().bounds);
    setMainWindowData({ isMaximized: true });
    mainWin.setResizable(false);
    mainWin.webContents.send(MainWinUi.Maximize, true);
  });

  /**
   *  退出最大化
   */
  mainWin.on('unmaximize', () => {
    // console.log('退出最大化');
    setMainWindowData({ isMaximized: false });
    mainWin.setResizable(true);
    mainWin.webContents.send(MainWinUi.Maximize, false);
  });

  /**
   *  最小化
   */
  mainWin.on('minimize', () => {
    // console.log('最小化');
    setMainWindowData({ isMinimized: true });
    mainWin.webContents.send(MainWinUi.Minimize, true);
  });

  /**
   *  取消最小化
   */
  mainWin.on('restore', () => {
    // console.log('退出最小化');
    setMainWindowData({ isMinimized: false });
    mainWin.webContents.send(MainWinUi.Minimize, false);
  });

  /**
   *  窗口大小调整
   */
  mainWin.on('resized', () => {
    console.log('resized');
    if (mainWin.isMaximized() || mainWin.isFullScreen()) return;
    updateBounds(mainWin);
  });

  /**
   *  窗口位置调整
   */
  mainWin.on('move', () => {
    if (mainWin.isMaximized() || mainWin.isFullScreen()) return;
    updateBounds(mainWin);
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
function updateBounds(mainWin: BrowserWindow) {
  const bounds = mainWin.getBounds();
  setMainWindowData({ bounds });
}
