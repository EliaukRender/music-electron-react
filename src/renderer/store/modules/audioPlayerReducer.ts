import { createSlice } from '@reduxjs/toolkit';

// interface
export interface AudioPlayerState {
  songId: number | null;
}

// 初始state
const initialState: AudioPlayerState = {
  songId: null, // 当前播放的歌曲id
};

/**
 * @description: 播放器 控制栏 的数据
 */
const audioPlayerSlice = createSlice({
  name: 'playerControl',

  initialState,

  // 同步reducers
  reducers: {
    setSongId(state, { payload }) {
      state.songId = payload;
    },
  },

  // 异步reducers
  extraReducers: () => {},
});

export const { setSongId } = audioPlayerSlice.actions; // 同步的dispatch

export default audioPlayerSlice.reducer; // reducer
