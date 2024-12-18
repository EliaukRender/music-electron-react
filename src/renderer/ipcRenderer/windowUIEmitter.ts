import WindowUIEvent from '../../eventNameEnum/windowUIEvent';

/**
 * @description: 窗口UI通信事件
 */
export default {
  // 最大化app窗口
  maxApp: async (): Promise<boolean> => {
    try {
      const res = await window.electron.ipcRenderer.invoke(
        WindowUIEvent.MAX_APP,
      );
      return res as boolean;
    } catch (e) {
      console.error('maxApp error!', e);
      return false;
    }
  },

  // 最小化app窗口
  minApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.MIN_APP);
  },

  // 全屏窗口
  fullApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.FULL_APP);
  },

  // 关闭APP
  closeApp: () => {
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.CLOSE_APP);
  },
};
