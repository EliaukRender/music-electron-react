import { WindowPositionType } from '@/types/commonTypes';
import WindowUIEvent from '../../eventNameEnum/windowUIEvent';

/**
 * @description: 窗口位置
 */
export default {
  dragApp: (data: WindowPositionType) => {
    console.log('data', data);
    window.electron.ipcRenderer.sendMessage(WindowUIEvent.DRAG_APP, data);
  },
};
