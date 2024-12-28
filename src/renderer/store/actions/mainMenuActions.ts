/**
 * @description: 关于播放器 主菜单 的异步事件
 */
import {
  queryCommonMenuList,
  querySheetList,
  querySongListBySheetId,
} from '@/renderer/api/modules/musicService';
import store from '@/renderer/store';
import {
  setActiveSheet,
  setCurSheetSongList,
  setOnlineMenuList,
  setSheetMenuList,
} from '@/renderer/store/modules/mainMenuReducer';
import {
  setActiveSongId,
  setActiveSongList,
  setActiveSongUrl,
} from '@/renderer/store/modules/playerControlReducer';

const { dispatch } = store;

/**
 * @description: 进入app时初始化数据
 */
export const initAppData = async () => {
  try {
    // todo 先从缓存拿菜单数据，同步去接口请求获取最新的菜单数据

    await initAppMenuData();
    const { sheetMenuList } = store.getState().mainMenu;

    // 有歌单数据
    if (sheetMenuList.length) {
      dispatch(setActiveSheet(sheetMenuList[0]));
      await getSongListBySheetId({ sheetId: sheetMenuList[0].sheetId });
      const list = store.getState().mainMenu.curSheetSongList;
      if (list?.length) {
        dispatch(setActiveSongList(list)); // 默认的播放队列
        dispatch(setActiveSongId(list[0].songId)); // 默认的一首歌
        dispatch(setActiveSongUrl(list[0].songUrl)); // 默认的一首歌
      }
    } else {
      // todo 进入音乐馆
    }
  } catch (e) {
    console.log('initAppData error', e);
  }
};

/**
 * @description: 初始化 主菜单数据
 */
export const initAppMenuData = async () => {
  const [resMenu, resSheet] = await Promise.all([
    queryCommonMenuList(),
    querySheetList(),
  ]);
  dispatch(setOnlineMenuList(resMenu.data || [])); // 在线菜单
  dispatch(setSheetMenuList(resSheet.data || [])); // 歌单菜单
};

/**
 * @description: 基于歌单ID 获取音乐列表
 */
export const getSongListBySheetId = async ({
  sheetId,
  isOnline,
}: {
  sheetId: number;
  isOnline?: boolean;
}) => {
  try {
    const { data } = await querySongListBySheetId({ sheetId, isOnline });
    dispatch(setCurSheetSongList(data || []));
  } catch (e) {
    console.log('error-getSongListBySheetId', e);
  }
};
