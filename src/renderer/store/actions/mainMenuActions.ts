/**
 * @description: 关于播放器 主菜单 的异步事件
 */
import {
  createSheet,
  deleteSheet,
  deleteSongFromSheet,
  moveSongToSheet,
  queryCommonMenuList,
  queryMusicHomeSheet,
  querySheetList,
  querySongListBySheetId,
} from '@/renderer/api/modules/musicService';
import store from '@/renderer/store';
import {
  setOnlineMenuList,
  setSheetMenuList,
} from '@/renderer/store/modules/mainMenuReducer';

const { dispatch } = store;

/**
 * @description: 初始化菜单数据
 */
export const initAppMenuData = async () => {
  await getOnlineMenuList();
  await getSheetMenuList();
};

/**
 * @description: 获取在线菜单
 */
export const getOnlineMenuList = async () => {
  try {
    const { data } = await queryCommonMenuList();
    dispatch(setOnlineMenuList(data || []));
  } catch (e) {
    console.log('error-getCommonMenuList', e);
  }
};

/**
 * @description: 获取我的所有 歌单菜单 列表
 */
export const getSheetMenuList = async () => {
  try {
    const { data } = await querySheetList();
    dispatch(setSheetMenuList(data || []));
  } catch (e) {
    console.log('error-getSheetList', e);
  }
};
