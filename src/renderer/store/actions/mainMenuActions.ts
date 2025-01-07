/**
 * @description: 关于播放器 主菜单 的异步事件
 */
import {
  createSheet,
  deleteSheet,
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
import {
  OnlineMenuItemType,
  SheetMenuItemType,
} from '@/renderer/types/menuTypes';

const { dispatch } = store;

/**
 * @description: 进入app时初始化数据
 */
export const initAppData = async () => {
  try {
    // todo 先从缓存拿菜单数据，同步去接口请求获取最新的菜单数据
    await initCommonMenu();
    await initSheetMenu();
    const { sheetMenuList } = store.getState().mainMenu;
    // 有歌单数据
    if (sheetMenuList.length) {
      dispatch(setActiveSheet(sheetMenuList[0])); // 默认激活第一个歌单
      const { sheetSongListMap } = store.getState().mainMenu;
      const firstSongList = sheetSongListMap[sheetMenuList[0].sheetId]; // 第一个歌单的歌曲列表
      if (firstSongList?.length) {
        dispatch(setCurSheetSongList(firstSongList)); // 保存第一个歌单的歌曲列表
        dispatch(setActiveSongList(firstSongList)); // 默认的播放队列
        dispatch(setActiveSongId(firstSongList[0].songId)); // 默认的一首歌
        dispatch(setActiveSongUrl(firstSongList[0].songUrl)); // 默认的一首歌
      }
    } else {
      // todo 进入音乐馆
    }
  } catch (e) {
    console.log('initAppData error', e);
  }
};

/**
 * @description: 初始化公共菜单数据
 */
export const initCommonMenu = async () => {
  try {
    const res = await queryCommonMenuList();
    const menuList = res.data as OnlineMenuItemType[];
    dispatch(setOnlineMenuList(menuList)); // 在线菜单
  } catch (e) {
    console.log('error initCommonMenu', e);
  }
};

/**
 * @description: 初始化歌单列表菜单
 */
export const initSheetMenu = async () => {
  try {
    const res = await querySheetList();
    const sheetList = res.data as SheetMenuItemType[];
    dispatch(setSheetMenuList(sheetList)); // 歌单菜单
    if (sheetList?.length) {
      // 遍历获取所有歌单中的歌曲列表
      const resultList = await Promise.all(
        sheetList.map(async (item: SheetMenuItemType) => {
          const list = await getSongListBySheetId({ sheetId: item.sheetId });
          return [item.sheetId, list] as [number, any[]];
        }),
      );
      const mapObj = resultList.reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<number, any[]>,
      );
      dispatch(setSheetSongListMap(mapObj));
    }
  } catch (e) {
    console.log('error initSheetMenu', e);
  }
};

/**
 * @description: 获取歌单中的歌曲列表
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

/**
 * @description: 删除歌单
 */
export const handleDeleteSheet = async (sheetId: number) => {
  try {
    await deleteSheet({ sheetId });
    message.success('删除成功');
    // 更新redux存储的数据
    const { sheetSongListMap, sheetMenuList } = store.getState().mainMenu;
    const obj = JSON.parse(JSON.stringify(sheetSongListMap));
    delete obj[sheetId];
    dispatch(setSheetSongListMap(obj));
    const sheet = JSON.parse(JSON.stringify(sheetMenuList));
    const index = sheet.findIndex(
      (item: SheetMenuItemType) => item.sheetId === sheetId,
    );
    sheet.splice(index, 1);
    dispatch(setSheetMenuList(sheet));
  } catch (e: any) {
    console.log('error-handleDeleteSheet', e);
    message.error(e?.message || '删除失败');
  }
};
