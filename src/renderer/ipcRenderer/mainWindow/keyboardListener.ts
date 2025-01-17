import {
  KeyboardEventEnum,
  KeyboardEnum,
} from '@/main/ipcMain/ipcEventEnum/keyboard';
import store from '@/renderer/store';
import winUiEmitter from '@/renderer/ipcRenderer/mainWindow/winUiEmitter';
import {
  pauseAudio,
  playSong,
} from '@/renderer/store/actions/audioPlayerActions';
import { setShowLyric } from '@/renderer/store/modules/playerControlReducer';

const { dispatch } = store;

/**
 * @description: 主线程 ===> 主窗口的渲染进程 : 监听键盘事件
 */
const keyboardListener = () => {
  window.electron.ipcRenderer.on(KeyboardEventEnum.Keyboard, (data) => {
    switch (data) {
      case KeyboardEnum.Enter:
        handleEnter();
        break;
      case KeyboardEnum.Space:
        handleSpace();
        break;
      case KeyboardEnum.Esc:
        handleEsc();
        break;
      default:
        break;
    }
  });
};

export default keyboardListener;

/**
 * Enter
 */
function handleEnter() {
  const { isMinimize, isFullScreen } = store.getState().global;
  if (isMinimize) return;
  if (isFullScreen) {
    // 退出全屏
    winUiEmitter.fullScreen();
    return;
  }
  // 最大化/退出最大化
  winUiEmitter.maximize();
}

/**
 * Space
 */
function handleSpace() {
  const { isMinimize } = store.getState().global;
  if (isMinimize) return;
  const { activeSongId } = store.getState().playerControl;
  if (!activeSongId) return;
  const { isPlaying } = store.getState().audioPlayer;
  // 暂停歌曲
  if (isPlaying) {
    pauseAudio();
    return;
  }
  // 播放歌曲
  playSong();
}

/**
 * Esc
 */
function handleEsc() {
  const { isFullScreen } = store.getState().global;
  if (isFullScreen) {
    winUiEmitter.fullScreen(); // 退出全屏
    return;
  }
  const { showLyrics } = store.getState().playerControl;
  if (showLyrics) {
    dispatch(setShowLyric(false)); // 关闭歌词
  }
}
