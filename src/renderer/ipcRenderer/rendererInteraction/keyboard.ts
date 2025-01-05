import {
  KeyboardEventEnum,
  KeyboardEnum,
} from '@/InteractionEnum/keyboardEvent';
import store from '@/renderer/store';
import windowUIEmitter from '@/renderer/ipcRenderer/rendererInteraction/windowUi';
import {
  pauseAudio,
  playSong,
} from '@/renderer/store/actions/audioPlayerActions';
import { setShowLyric } from '@/renderer/store/modules/playerControlReducer';

const { dispatch } = store;

/**
 * @description: 监听主线程的键盘事件
 */
export const KeyboardHandler = () => {
  window.electron.ipcRenderer.on(KeyboardEventEnum.Keyboard, (data) => {
    handleKeyboard(data as KeyboardEnum);
  });
};

// 处理键盘事件
function handleKeyboard(data: KeyboardEnum) {
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
}

/**
 * Enter
 */
function handleEnter() {
  const { isMinimize, isFullScreen } = store.getState().global;
  if (isMinimize) return;
  if (isFullScreen) {
    // 退出全屏
    windowUIEmitter.fullScreen();
    return;
  }
  // 最大化/退出最大化
  windowUIEmitter.maximize();
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
    windowUIEmitter.fullScreen(); // 退出全屏
    return;
  }
  const { showLyrics } = store.getState().playerControl;
  if (showLyrics) {
    dispatch(setShowLyric(false)); // 关闭歌词
  }
}
