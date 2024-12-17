import WindowUIEvent from '../../eventNameEnum/windowUIEvent';

/**
 * @description: 窗口UI通信事件
 */
export default {
  // 最大化app窗口
  maxApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.MAX_APP, 'maxApp');
  },

  // 最小化app窗口
  minApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.MIN_APP, 'minApp');
  },

  // 全屏从黄口
  fullApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.FULL_APP, 'fullApp');
  },
};
