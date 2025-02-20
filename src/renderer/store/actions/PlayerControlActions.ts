import store from '@/renderer/store';
import { moveSongToSheet } from '@/renderer/api/modules/musicService';
import { getSongListBySheetId } from '@/renderer/store/actions/mainMenuActions';
import MessageToast from '@/renderer/components/MessageToast';
import {
  deleteSongById,
  setActiveSongId,
  setMusicMode,
} from '@/renderer/store/modules/playerControlReducer';

const { dispatch } = store;


/**
 * @description: 删除播放队列中的歌曲
 */
export const deleteSongFromSongList = async (songId: number) => {
  const { isPlaying } = store.getState().audioPlayer;
  const { activeSongList } = store.getState().playerControl;
  const index = activeSongList.findIndex((item: any) => item.songId === songId);
  if (index === -1) {
    console.error('删除的歌曲index不存在：', index);
    return;
  }
  // 只有一首歌时，不允许删除
  if (activeSongList.length === 1) {
    MessageToast.warning('别删啦！播放列表仅剩一首歌！');
    return;
  }
  // 找到下一首歌
  const targetSong =
    activeSongList[index === activeSongList.length - 1 ? 0 : index + 1];
  if (!targetSong) {
    console.error('targetSong不存在:', targetSong);
    return;
  }
  dispatch(deleteSongById(index)); // 删除
  dispatch(setActiveSongId(targetSong.songId));
  if (isPlaying) {
    // todo
    // audio.pause();
    // await playAudio(targetSong.songId); // 播放下一首
  }
};

/**
 * @description: 调节音乐播放模式: 1-顺序播放、2-随机播放、3-单曲循环
 */
export const changeMusicMode = (mode: number) => {
  dispatch(setMusicMode(mode));
};
