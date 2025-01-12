import WindowUIEvent from '@/InteractionEnum/windowUIEvent';

export const openMiniPlayer = () => {
  window.electron.ipcRenderer.sendMessage(WindowUIEvent.Mini_Player);
};
