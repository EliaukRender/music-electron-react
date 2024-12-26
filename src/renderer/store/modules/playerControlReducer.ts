import { createSlice } from '@reduxjs/toolkit';

// interface
export interface PlayerControlState {
  showLyrics: boolean;
  activeSongList: any[];
  activeSongId: number | null;
}

// 初始state
const initialState: PlayerControlState = {
  showLyrics: false, // 是否显示歌词界面
  activeSongList: [], // 当前在播放队列的 歌曲列表
  activeSongId: null, // 当前激活的 歌曲id
};

/**
 * @description: 播放器 控制栏 的数据
 */
const playerControlSlice = createSlice({
  name: 'playerControl',

  initialState,

  // 同步reducers
  reducers: {
    setShowLyric(state, { payload }) {
      state.showLyrics = payload;
    },
  },

  // 异步reducers
  extraReducers: () => {},
});

export const { setShowLyric } = playerControlSlice.actions; // 同步的dispatch

export default playerControlSlice.reducer; // reducer
