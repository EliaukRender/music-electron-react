import WindowUIEvent from '../../eventNameEnum/windowUIEvent';
import { setMaxScreen } from '@/renderer/store/modules/globalReducer';
import store from '@/renderer/store';

const { dispatch } = store;

/**
 * @description: 窗口UI通信事件
 */
export default {
  // 最大化app窗口
  maxApp: () => {
    window.electron.ipcRenderer
      .invoke(WindowUIEvent.MAX_APP)
      .then((res) => {
        dispatch(setMaxScreen(res));
      })
      .catch((err) => {
        console.error('maxApp error!!!', err);
      });
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
