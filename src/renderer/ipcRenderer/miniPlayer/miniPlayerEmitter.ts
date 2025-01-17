import { MiniPlayerEventEnum } from '@/main/ipcMain/ipcEventEnum/mini_events';
import { WindowPositionType } from '@/types/commonTypes';

/**
 * @description: mini-player渲染进程  ===> 主线程  发送消息
 */

const miniPlayerEmitter = {
  /**
   * 更新窗口位置
   * @param data 窗口最新位置坐标
   */
  updateMiniPlayerPosition: (data: WindowPositionType) => {
    window.electron.ipcRenderer.sendMessage(
      MiniPlayerEventEnum.Update_Mini_Player_Position,
      data,
    );
  },

  /**
   * @description: 改变窗口高度
   * @param height 窗口高度
   */
  changeWinHeight: async (height: number) => {
    try {
      const res = await window.electron.ipcRenderer.invoke(
        MiniPlayerEventEnum.Change_Mini_Player_Height,
        height,
      );
      return res as boolean;
    } catch (e) {
      console.log('error changeWinHeight', e);
    }
  },

  /**
   * 开始播放
   */
  startPlay: () => {
    window.electron.ipcRenderer.sendMessage(MiniPlayerEventEnum.StartPlay);
  },

  /**
   *  暂停播放
   */
  pausePlay: () => {
    window.electron.ipcRenderer.sendMessage(MiniPlayerEventEnum.PausePlay);
  },

  /**
   *  播放上一首
   */
  prePlay: () => {
    window.electron.ipcRenderer.sendMessage(MiniPlayerEventEnum.PrePlay);
  },

  /**
   *  播放下一首
   */
  nextPlay: () => {
    window.electron.ipcRenderer.sendMessage(MiniPlayerEventEnum.NextPlay);
  },

  /**
   *  播放指定歌曲
   */
  playNew: (songInfo: any) => {
    window.electron.ipcRenderer.sendMessage(
      MiniPlayerEventEnum.PlayNew,
      songInfo,
    );
  },

  /**
   *  喜欢某首歌
   */
  likeSong: (songId: number) => {
    console.log('likeSong', songId);
    window.electron.ipcRenderer.sendMessage(
      MiniPlayerEventEnum.PlayNew,
      songId,
    );
  },
};

export default miniPlayerEmitter;
