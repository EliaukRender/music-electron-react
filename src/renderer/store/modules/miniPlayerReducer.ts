import { createSlice } from '@reduxjs/toolkit';

interface IState {
  activeSongList: any[];
  activeSongId: number;
}

const initialState: IState = {
  activeSongId: -1, // 当前激活的 歌曲id
  activeSongList: [], // 当前在播放队列的 歌曲列表
};

/**
 * @description: 全局数据
 */
const miniPlayerSlice = createSlice({
  name: 'mini-player',

  initialState,

  // 同步reducers
  reducers: {
    setActiveSongId(state, { payload }) {
      state.activeSongId = payload;
    },
    setActiveSongList(state, { payload }) {
      state.activeSongList = payload;
    },
  },

  // 异步reducers
  extraReducers: () => {},
});

export const { setActiveSongId, setActiveSongList } = miniPlayerSlice.actions; // 同步的dispatch
export default miniPlayerSlice.reducer; // reducer
