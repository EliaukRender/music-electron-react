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
  setCurSheetSongList,
  setOnlineMenuList,
  setSheetMenuList,
} from '@/renderer/store/modules/mainMenuReducer';

const { dispatch } = store;

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
 * @description: 基于歌单ID获取音乐列表
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
