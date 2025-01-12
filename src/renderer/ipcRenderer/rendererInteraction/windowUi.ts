import WindowUIEvent from '@/InteractionEnum/windowUIEvent';
import {
  setIsFullScreen,
  setIsMaximize,
  setIsMinimize,
} from '@/renderer/store/modules/globalReducer';
import store from '@/renderer/store';
import { WindowPositionType } from '@/types/commonTypes';

const { dispatch } = store;

/**
 * 给主线程的窗口事件消息
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

  // mini播放器
  miniPlayer: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.Mini_Player);
  },
};

/**
 *  监听主线程的窗口事件消息
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
