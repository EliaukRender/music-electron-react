import { createSlice } from '@reduxjs/toolkit';

// interface
export interface PlayerControlState {
  showLyrics: boolean;
  activeSongList: any[];
  activeSongId: number;
  musicMode: number;
  activeSongUrl: string;
  drawerVisible: boolean;
  isLoadingSong: boolean;
}

// 初始state
const initialState: PlayerControlState = {
  activeSongId: -1, // 当前激活的 歌曲id
  activeSongUrl: '', // 当前播放歌曲的url
  activeSongList: [], // 当前在播放队列的 歌曲列表
  isLoadingSong: false, // 是否正在加载歌曲

  musicMode: 1, // 1-顺序播放、2-随机播放、3-单曲循环
  showLyrics: false, // 是否显示歌词界面
  drawerVisible: false, // 是否显示频谱弹窗
};

/**
 * @description: 播放器 控制栏 的数据
 */
const playerControlSlice = createSlice({
  name: 'playerControl',

  initialState,

  // 同步reducers
  reducers: {
    setIsLoadingSong(state, { payload }) {
      state.isLoadingSong = payload;
    },

    setShowLyric(state, { payload }) {
      state.showLyrics = payload;
    },

    setActiveSongId(state, { payload }) {
      state.activeSongId = payload;
    },

    deleteSongById(state, { payload }) {
      state.activeSongList.splice(payload, 1);
    },

    // 保存音乐播放模式
    setMusicMode(state, { payload }) {
      state.musicMode = payload;
    },

    // 保存当前音频url
    setActiveSongUrl(state, { payload }) {
      state.activeSongUrl = payload;
    },

    setDrawerVisible(state, { payload }) {
      state.drawerVisible = payload;
    },

    setActiveSongList(state, { payload }) {
      state.activeSongList = payload;
    },
  },

  // 异步reducers
  extraReducers: () => {},
});

export const {
  setShowLyric,
  deleteSongById,
  setActiveSongId,
  setMusicMode,
  setActiveSongUrl,
  setDrawerVisible,
  setActiveSongList,
  setIsLoadingSong,
} = playerControlSlice.actions; // 同步的dispatch

export default playerControlSlice.reducer; // reducer
