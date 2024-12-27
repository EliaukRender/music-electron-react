import store from '@/renderer/store';
import { moveSongToSheet } from '@/renderer/api/modules/musicService';
import { getSongListBySheetId } from '@/renderer/store/actions/mainMenuActions';
import MessageToast from '@/renderer/components/MessageToast';
import {
  deleteSongById,
  setActiveSongId,
} from '@/renderer/store/modules/playerControlReducer';

const { dispatch } = store;

/**
 * @description: 添加指 定歌曲 到 指定歌单
 */
export const handleMoveSongToSheet = async ({
  curSong,
  sheetId,
}: {
  curSong: any;
  sheetId: number;
}) => {
  const { activeSongId } = store.getState().playerControl;
  const { activeSheet } = store.getState().mainMenu;
  try {
    // 歌单列表中移动歌曲，则有curSong
    // 待播放列表中移动歌曲，则没有curSong
    await moveSongToSheet({
      songId: curSong ? curSong.songId : activeSongId,
      sheetId,
    });
    MessageToast.success('添加成功');
    if (sheetId === activeSheet.sheetId) {
      await getSongListBySheetId({ sheetId });
    }
  } catch (e) {
    console.log('error-handleMoveSongToSheet', e);
    MessageToast.error('添加失败');
  }
};

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
