import { MiniPlayerEventEnum } from '@/main/miniPlayer/eventEnum/miniPlayerEvent';
import { WindowPositionType } from '@/types/commonTypes';

/**
 * @description: mini-player渲染进程  ===> 主线程  发送消息
 */

// 更新窗口位置
export const updateMiniPlayerPosition = (data: WindowPositionType) => {
  window.electron.ipcRenderer.sendMessage(
    MiniPlayerEventEnum.Update_Mini_Player_Position,
    data,
  );
};

/**
 * @description: 改变窗口高度
 * @param height 窗口高度
 */
export const changeWinHeight = async (height: number) => {
  try {
    const res = await window.electron.ipcRenderer.invoke(
      MiniPlayerEventEnum.Change_Mini_Player_Height,
      height,
    );
    return res as boolean;
  } catch (e) {
    console.log('error changeWinHeight', e);
  }
};
