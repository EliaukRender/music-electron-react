import { BrowserWindow, ipcMain } from 'electron';
import { MiniPlayerEventEnum } from '@/main/miniPlayer/eventEnum/miniPlayerEvent';

/**
 * @description: 监听mini-player窗口中的音乐控制事件
 */
export const musicControlListener = (mainWin: BrowserWindow | null) => {
  if (!mainWin) return;

  /**
   * 开始播放
   */
  ipcMain.on(MiniPlayerEventEnum.StartPlay, () => {
    mainWin.webContents.send(MiniPlayerEventEnum.StartPlay);
  });

  /**
   *  暂停播放
   */
  ipcMain.on(MiniPlayerEventEnum.PausePlay, () => {
    mainWin.webContents.send(MiniPlayerEventEnum.PausePlay);
  });

  /**
   *  播放上一首
   */
  ipcMain.on(MiniPlayerEventEnum.PrePlay, () => {
    mainWin.webContents.send(MiniPlayerEventEnum.PrePlay);
  });

  /**
   *  播放下一首
   */
  ipcMain.on(MiniPlayerEventEnum.NextPlay, () => {
    mainWin.webContents.send(MiniPlayerEventEnum.NextPlay);
  });

  /**
   *  播放指定歌曲
   */
  ipcMain.on(MiniPlayerEventEnum.PlayNew, (event, data) => {
    mainWin.webContents.send(MiniPlayerEventEnum.PlayNew, data);
  });
};
