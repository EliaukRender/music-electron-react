import { BrowserWindow, ipcMain } from 'electron';
import { MiniPlayerEventEnum } from '@/main/ipcMain/ipcEventEnum/mini_events';
import {
  getMiniPlayerWinData,
  setMiniPlayerWinData,
} from '@/main/ipcMain/appData/miniWinData';
import { getScreenWidthHeight } from '@/main/util';

/**
 * @description: 监听miniPlayerWin窗口的事件消息
 */
export function miniWinListener(miniPlayerWin: BrowserWindow | null) {
  if (!miniPlayerWin) return;

  /**
   * 更新位置
   */
  ipcMain.on(MiniPlayerEventEnum.Update_Mini_Player_Position, (event, data) => {
    if (!miniPlayerWin) {
      console.error('窗口不存在');
      return;
    }
    const { screenWidth, screenHeight } = getScreenWidthHeight();
    // todo 考虑多显示器场景
    const { bounds } = getMiniPlayerWinData();
    if (data.y < -10) return; // 上
    if (screenHeight - data.y <= 50) return; // 下
    if (data.x < -(bounds!.width * 0.7)) return; // 左
    if (screenWidth - data.x < bounds!.width * 0.3) return; // 右
    miniPlayerWin.setPosition(data.x, data.y);
    // console.log(data.x, data.y);
  });

  /**
   *  窗口移动到新位置时触发
   */
  miniPlayerWin.on('move', () => {
    handleMove(miniPlayerWin);
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
  setMiniPlayerWinData({ bounds });
}

// 设置mini窗口的默认bounds
export function getMiniPlayerWinBounds(miniPlayerWindow: BrowserWindow | null) {
  if (!miniPlayerWindow) return;
  const bounds = miniPlayerWindow?.getBounds();
  if (!bounds?.width) return;
  const { screenWidth, screenHeight } = getScreenWidthHeight();
  // 保存窗口位置数据
  return {
    x: screenWidth - bounds.width - 50,
    y: screenHeight - bounds.height - 2,
    width: bounds.width,
    height: bounds.height,
  };
}
