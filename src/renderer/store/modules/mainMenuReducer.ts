import { createSlice } from '@reduxjs/toolkit';
import {
  OnlineMenuItemType,
  SheetMenuItemType,
} from '@/renderer/types/menuTypes';

// interface
export interface MainMenuState {
  onlineMenuList: OnlineMenuItemType[];
  sheetMenuList: SheetMenuItemType[];
  activeSheet: SheetMenuItemType;
  activeMenu: OnlineMenuItemType;
  curSheetSongList: any;
}

// 初始state
const initialState: MainMenuState = {
  onlineMenuList: [], // 在线菜单 列表
  sheetMenuList: [], // 歌单菜单 列表
  activeSheet: {} as SheetMenuItemType, // 当前激活的 个人歌单
  activeMenu: {} as OnlineMenuItemType, // 当前激活的 在线菜单
  curSheetSongList: [], // 当前歌单 对应的 歌曲列表
};

/**
 * @description: 播放器的左侧 主菜单 数据
 */
const mainMenuSlice = createSlice({
  name: 'mainMenu',

  initialState,

  // 同步reducers
  reducers: {
    setOnlineMenuList(state, { payload }) {
      state.onlineMenuList = payload;
    },

    setSheetMenuList(state, { payload }) {
      state.sheetMenuList = payload;
    },

    setActiveMenu(state, { payload }) {
      state.activeMenu = payload;
    },

    setActiveSheet(state, { payload }) {
      state.activeSheet = payload;
    },

    setCurSheetSongList(state, { payload }) {
      state.curSheetSongList = payload;
    },
  },

  // 异步reducers
  extraReducers: () => {},
});

export const {
  setOnlineMenuList,
  setSheetMenuList,
  setActiveMenu,
  setActiveSheet,
  setCurSheetSongList,
} = mainMenuSlice.actions; // 同步的dispatch

export default mainMenuSlice.reducer; // reducer
