import { RootState } from '@/renderer/store';
import { shallowEqual, useSelector } from 'react-redux';
import { useEffect } from 'react';
import winUiEmitter from '@/renderer/ipcRenderer/mainWindow/winUiEmitter';

/**
 * 监听redux数据变化，更新mini-player窗口的数据
 */
export function useUpdateMiniPlayerData() {
  const { activeSongId, activeSongList, isPlaying } = useSelector(
    (state: RootState) => ({
      activeSongId: state.playerControl.activeSongId,
      activeSongList: state.playerControl.activeSongList,
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );

  useEffect(() => {
    winUiEmitter.updateMiniPlayerData();
  }, [activeSongId, activeSongList, isPlaying]);
}
