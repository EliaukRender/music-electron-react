import WindowUIEvent from '../../eventNameEnum/windowUIEvent';

/**
 * @description: 窗口UI通信事件
 */
export default {
  // 最大化app窗口
  maxApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.MAX_APP);
  },

  // 最小化app窗口
  minApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.MIN_APP);
  },

  // 全屏窗口
  fullApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.FULL_APP);
  },

  // 关闭窗口
  closeApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.CLOSE_APP);
  },
};
