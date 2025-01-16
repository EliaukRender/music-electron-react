import WindowUIEvent from '@/main/mainWindow/eventEnum/windowUIEvent';
import {
  setIsFullScreen,
  setIsMaximize,
  setIsMinimize,
} from '@/renderer/store/modules/globalReducer';
import store from '@/renderer/store';
import { WindowPositionType } from '@/types/commonTypes';
import { MiniPlayerEventEnum } from '@/main/miniPlayer/eventEnum/miniPlayerEvent';

const { dispatch } = store;

/**
 *  渲染进程 ===> 主线程 : 发送窗口UI相关的事件
 */
export default {
  // 最大化app窗口
  maximize: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.Maximize);
  },

  // 最小化app窗口
  minimize: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.Minimize);
  },

  // 全屏窗口
  fullScreen: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.Full_Screen);
  },

  // 关闭APP
  closeApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.Close);
  },

  // 更新窗口位置
  setPosition: (data: WindowPositionType) => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.Set_Position, data);
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
};

/**
 *  主线程 ===> 渲染进程 : 监听窗口事件的消息，更新渲染进程的窗口数据
 */
export const windowUiHandler = () => {
  window.electron.ipcRenderer.on(WindowUIEvent.Maximize, (data) => {
    dispatch(setIsMaximize(data));
  });

  window.electron.ipcRenderer.on(WindowUIEvent.Minimize, (data) => {
    dispatch(setIsMinimize(data));
  });

  window.electron.ipcRenderer.on(WindowUIEvent.Full_Screen, (data) => {
    dispatch(setIsFullScreen(data));
  });
};
