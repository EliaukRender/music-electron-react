import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import WindowUIEvent from '../eventNameEnum/windowUIEvent';

/**
 * note: Channels是消息通道的消息名称约束，所有消息的Enum类型都必须在这里定义
 */
export type Channels = WindowUIEvent;

/*
 *  渲染进程 与 主线程 事件通信对象
 * */
const electronHandler = {
  ipcRenderer: {
    // 发送消息到主线程(同步消息)
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

    // 发送消息到主线程并等待响应
    async invoke(channel: Channels, ...args: any[]): Promise<unknown> {
      try {
        return await ipcRenderer.invoke(channel, ...args);
      } catch (e) {
        console.log('invoke error!!!', e);
      }
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
