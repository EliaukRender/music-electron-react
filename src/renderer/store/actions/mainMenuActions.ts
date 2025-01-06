/**
 * @description: 关于播放器 主菜单 的异步事件
 */
import {
  createSheet,
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
  setSheetSongListMap,
} from '@/renderer/store/modules/mainMenuReducer';
import {
  setActiveSongId,
  setActiveSongList,
  setActiveSongUrl,
} from '@/renderer/store/modules/playerControlReducer';
import { message } from 'antd';
import { SheetMenuItemType } from '@/renderer/types/menuTypes';

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
      dispatch(setActiveSheet(sheetMenuList[0])); // 默认激活第一个歌单
      // 遍历获取所有歌单中的歌曲列表
      const resultList = await Promise.all(
        sheetMenuList.map(async (item: SheetMenuItemType) => {
          const list = await getSongListBySheetId({ sheetId: item.sheetId });
          return { [item.sheetId]: list };
        }),
      );
      const temp = resultList.reduce((cur, acc) => ({ ...acc, ...cur }), {});
      // console.log('temp', temp);
      dispatch(setSheetSongListMap(temp));
      const firstSongList = temp[sheetMenuList[0].sheetId] || [];
      dispatch(setCurSheetSongList(firstSongList)); // 第一个歌单的歌曲列表
      dispatch(setActiveSongList(firstSongList)); // 默认的播放队列
      dispatch(setActiveSongId(firstSongList[0].songId)); // 默认的一首歌
      dispatch(setActiveSongUrl(firstSongList[0].songUrl)); // 默认的一首歌
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
}): Promise<any[] | undefined> => {
  try {
    const res = await querySongListBySheetId({ sheetId, isOnline });
    return res?.data as unknown as any[];
  } catch (e) {
    console.log('error-getSongListBySheetId', e);
  }
};

/**
 * @description: 创建歌单
 */
export const handleCreateSheet = async ({
  sheetName,
  sheetIcon,
  sheetDesc,
}: {
  sheetName: string;
  sheetIcon: string;
  sheetDesc?: string;
}) => {
  try {
    await createSheet({ sheetName, sheetIcon, sheetDesc });
    message.success('创建歌单成功');
    const { data } = await querySheetList(); // 更新歌单列表
    data && dispatch(setSheetMenuList(data));
    return true;
  } catch (e: any) {
    console.log('error-handleCreateSheet', e);
    message.error(e?.message || '创建歌单失败');
    return false;
  }
};
