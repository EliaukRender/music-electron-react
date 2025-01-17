import MainWinUi from '@/main/ipcMain/ipcEventEnum/main_winUi';
import {
  setIsFullScreen,
  setIsMaximize,
  setIsMinimize,
} from '@/renderer/store/modules/globalReducer';
import store from '@/renderer/store';
import { WindowPositionType } from '@/types/commonTypes';
import { MiniPlayerEventEnum } from '@/main/ipcMain/ipcEventEnum/mini_events';

const { dispatch } = store;

/**
 *  渲染进程 ===> 主线程 : 发送窗口UI相关的事件
 */
export default {
  // 最大化app窗口
  maximize: () => {
    window.electron.ipcRenderer.sendMessage(MainWinUi.Maximize);
  },

  // 最小化app窗口
  minimize: () => {
    window.electron.ipcRenderer.sendMessage(MainWinUi.Minimize);
  },

  // 全屏窗口
  fullScreen: () => {
    window.electron.ipcRenderer.sendMessage(MainWinUi.Full_Screen);
  },

  // 关闭APP
  closeApp: () => {
    window.electron.ipcRenderer.sendMessage(MainWinUi.Close);
  },

  // 更新窗口位置
  setPosition: (data: WindowPositionType) => {
    window.electron.ipcRenderer.sendMessage(MainWinUi.Set_Position, data);
  },

  // 显示或隐藏mini-player窗口
  showHiddenMiniPlayer: () => {
    window.electron.ipcRenderer.sendMessage(
      MiniPlayerEventEnum.Show_Hidden_Mini_Player,
      {
        activeSongId: store.getState().playerControl.activeSongId,
        activeSongList: store.getState().playerControl.activeSongList,
      },
    );
  },

  // 更新mini-player窗口中的数据
  updateMiniPlayerData: () => {
    window.electron.ipcRenderer.sendMessage(
      MiniPlayerEventEnum.Update_Mini_Player_Data,
      {
        activeSongId: store.getState().playerControl.activeSongId,
        activeSongList: store.getState().playerControl.activeSongList,
        isPlaying: store.getState().audioPlayer.isPlaying,
      },
    );
  },
};

/**
 *  主线程 ===> 渲染进程 : 监听窗口事件的消息，更新渲染进程的窗口数据
 */
export const windowUiHandler = () => {
  window.electron.ipcRenderer.on(MainWinUi.Maximize, (data) => {
    dispatch(setIsMaximize(data));
  });

  window.electron.ipcRenderer.on(MainWinUi.Minimize, (data) => {
    dispatch(setIsMinimize(data));
  });

  window.electron.ipcRenderer.on(MainWinUi.Full_Screen, (data) => {
    dispatch(setIsFullScreen(data));
  });
};
