import { MiniPlayerEventEnum } from '@/main/ipcMain/ipcEventEnum/mini_events';
import {
  pauseAudio,
  playNextSong,
  playPreSong,
  playSong,
} from '@/renderer/store/actions/audioPlayerActions';

/**
 * @description: 处理来自于  mini-player窗口 ==> 主线程 ===> 主窗口  的音乐控制事件
 */
export const musicControlHandler = () => {
  /**
   * 开始播放
   */
  window.electron.ipcRenderer.on(MiniPlayerEventEnum.StartPlay, () => {
    playSong();
  });

  /**
   *  暂停播放
   */
  window.electron.ipcRenderer.on(MiniPlayerEventEnum.PausePlay, () => {
    pauseAudio();
  });

  /**
   *  播放上一首
   */
  window.electron.ipcRenderer.on(MiniPlayerEventEnum.PrePlay, () => {
    playPreSong();
  });

  /**
   *  播放下一首
   */
  window.electron.ipcRenderer.on(MiniPlayerEventEnum.NextPlay, () => {
    playNextSong(true);
  });

  /**
   *  播放指定歌曲
   */
  window.electron.ipcRenderer.on(MiniPlayerEventEnum.PlayNew, (songInfo) => {
    playSong(songInfo);
  });
};
