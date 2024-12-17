import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import WindowUIEvent from '../eventNameEnum/windowUIEvent';

export type Channels = WindowUIEvent; // 消息通道的消息名称约束

const electronHandler = {
  ipcRenderer: {
    // 发送消息到主线程
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },

    // 监听主线程的消息
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },

    // 监听主线程的消息（仅监听一次）
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
