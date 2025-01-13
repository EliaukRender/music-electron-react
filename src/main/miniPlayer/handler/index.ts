import { createBrowserWindow, resolveHtmlPath } from '@/main/util';
import { RouteEnum } from '@/renderer/constant/routeEnum';
import { BrowserWindow, ipcMain } from 'electron';
import { MiniPlayerEventEnum } from '@/main/miniPlayer/eventEnum/miniPlayerEvent';
import {
  getMiniPlayerWinData,
  setMiniPlayerWinData,
} from '@/main/miniPlayer/windowData';

let miniPlayerWindow: BrowserWindow | null = null;

/**
 * 新建mini-player窗口
 */
export const createMiniPlayerWindow = () => {
  miniPlayerWindow = createBrowserWindow({
    // width: 330,
    // height: 290,
    width: 600,
    height: 600,
    minWidth: 330,
    minHeight: 290,
  });
  miniPlayerWindow.setSkipTaskbar(true); // 窗口不显示在任务栏
  miniPlayerWindow
    .loadURL(resolveHtmlPath(RouteEnum.MiniPlayer)) // 加载mini-player页面
    .then(() => {
      miniPlayerWinListener(miniPlayerWindow!); // 监听mini窗口事件
    })
    .catch(() => {});
  return miniPlayerWindow;
};

/**
 * 监听miniPlayerWin窗口的事件消息
 */
export function miniPlayerWinListener(miniPlayerWin: BrowserWindow) {
  /**
   * 显示 或者 隐藏 mini-player窗口
   */
  ipcMain.on(MiniPlayerEventEnum.Show_Hidden_Mini_Player, (event, data) => {
    if (!miniPlayerWin) {
      createMiniPlayerWindow();
    } else {
      miniPlayerWin.webContents.send(
        MiniPlayerEventEnum.Update_Mini_Player_Data,
        data,
      );
      const bounds = miniPlayerWin.getBounds(); // 窗口是否可见
      if (bounds.x === -9999 && bounds.y === -9999) {
        miniPlayerWin.setBounds(getMiniPlayerWinData().bounds!);
      } else {
        miniPlayerWin.setBounds({
          x: -9999,
          y: -9999,
        });
      }
    }
  });

  /**
   * 更新位置
   */
  ipcMain.on(MiniPlayerEventEnum.Update_Mini_Player_Position, (event, data) => {
    if (!miniPlayerWin) {
      console.error('窗口不存在');
      return;
    }
    miniPlayerWin.setPosition(data.x, data.y);
  });

  /**
   * mini-player窗口显示工作准备完毕时触发（避免窗口闪烁）
   */
  miniPlayerWin.on('ready-to-show', () => {
    setDefaultBounds();
    miniPlayerWin.show();
    miniPlayerWin.setBounds({ x: -9999, y: -9999 }); // 位移到屏幕外面隐藏窗口
  });

  /**
   *  窗口移动到新位置时触发
   */
  // @ts-ignore
  miniPlayerWin.on('move', handleMove(miniPlayerWin));
}

// =================================================

// 窗口move时暂存窗口位置信息
function handleMove(miniPlayerWin: BrowserWindow): void {
  const bounds = miniPlayerWin.getBounds();
  setMiniPlayerWinData({ bounds });
}

// 设置mini窗口的默认bounds
function setDefaultBounds() {
  const { screen } = require('electron'); // 获取主显示器的信息
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const bounds = miniPlayerWindow?.getBounds();
  setMiniPlayerWinData({
    bounds: {
      x: width - 500,
      y: height - 500,
      width: bounds?.width || 0,
      height: bounds?.height || 0,
    },
  });
}
