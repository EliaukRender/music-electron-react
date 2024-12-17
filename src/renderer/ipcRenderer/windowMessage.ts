import { ipcRenderer } from 'electron';
import { WindowMessageEnum } from './eventName/windowMessageEnum';

export const maxAppWindow = () => {
  ipcRenderer.invoke(WindowMessageEnum.MAX_APP, 'max-app');
};
