import { BrowserWindow, ipcMain } from 'electron';
import { MiniPlayerEventEnum } from '@/main/miniPlayer/eventEnum/miniPlayerEvent';
import {
  getMiniPlayerWinData,
  setMiniPlayerWinData,
} from '@/main/miniPlayer/windowData';
import { MiniPlayerEnum } from '@/main/miniPlayer/constant';

/**
 * @description: 监听miniPlayerWin窗口的事件消息
 */
export function miniPlayerWinListener(miniPlayerWin: BrowserWindow | null) {
  if (!miniPlayerWin) return;
  /**
   * 显示 或者 隐藏 mini-player窗口
   */
  ipcMain.on(MiniPlayerEventEnum.Show_Hidden_Mini_Player, (event, data) => {
    miniPlayerWin.webContents.send(
      MiniPlayerEventEnum.Update_Mini_Player_Data,
      data,
    );
    if (miniPlayerWin.isVisible()) {
      console.log('******打开mini111111111111');
      miniPlayerWin.minimize();
    } else {
      console.log(
        '******打开mini222222222',
        getMiniPlayerWinData().bounds.x,
        getMiniPlayerWinData().bounds.y,
      );
      miniPlayerWin.setPosition(
        getMiniPlayerWinData().bounds.x,
        getMiniPlayerWinData().bounds.y,
      );
      miniPlayerWin.restore();
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
   *  窗口移动到新位置时触发
   */
  miniPlayerWin.on('move', () => {
    handleMove(miniPlayerWin);
  });

  /**
   *  关闭mini-player
   */
  ipcMain.on(MiniPlayerEventEnum.Close_Mini_Player, (event, data) => {
    if (!miniPlayerWin) {
      console.error('mini-player窗口不存在');
      return;
    }
    miniPlayerWin.close();
  });

  /**
   * 窗口更改高度(歌曲列表折叠时窗口高度变小)
   */
  ipcMain.handle(
    MiniPlayerEventEnum.Change_Mini_Player_Height,
    (event, data: number) => {
      miniPlayerWin.setBounds({ height: data });
      return true;
    },
  );
}

// =================================================

// 窗口move时暂存窗口位置信息
function handleMove(miniPlayerWin: BrowserWindow): void {
  const bounds = miniPlayerWin.getBounds();
  if (bounds.x === -9999) return;
  setMiniPlayerWinData({ bounds });
}

// 设置mini窗口的默认bounds
export function getMiniPlayerWinBounds(miniPlayerWindow: BrowserWindow | null) {
  if (!miniPlayerWindow) return;
  const bounds = miniPlayerWindow?.getBounds();
  if (!bounds?.width) return;
  const { screen } = require('electron');
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  console.log('初始化默认数据', {
    x: width - bounds.width - 100,
    y: height - bounds.height - 100,
    width: bounds.width,
    height: bounds.height,
  });
  // 保存窗口位置数据
  return {
    x: width - bounds.width - 200,
    y: height - bounds.height - 20,
    width: bounds.width,
    height: bounds.height,
  };
}
