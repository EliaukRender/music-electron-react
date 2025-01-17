import {
  setIsFullScreen,
  setIsMaximize,
  setIsMinimize,
} from '@/renderer/store/modules/globalReducer';
import MainWinUi from '@/main/ipcMain/ipcEventEnum/main_winUi';
import store from '@/renderer/store';

const { dispatch } = store;

/**
 *  主线程 ===> 渲染进程 : 监听窗口事件的消息，更新渲染进程的窗口数据
 */
const winUiListener = () => {
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

export default winUiListener;
