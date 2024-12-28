import { createSlice } from '@reduxjs/toolkit';

// interface
export interface AudioPlayerState {
  playbackRate: number;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isPause: boolean;
  isEnded: boolean;
  muted: boolean;
}

// 初始state
const initialState: AudioPlayerState = {
  playbackRate: 1, // 播放速率
  isPlaying: false, // 正在播放
  duration: 0, // 歌曲总时长
  currentTime: 0, // 歌曲当前播放时间
  volume: 20, // 音量
  isPause: false, // 是否暂停
  isEnded: false, // 是否播放结束
  muted: false, // 是否静音
};

/**
 * @description: 音频数据 -- 仅仅和音频本身关联的数据
 */
const audioPlayerSlice = createSlice({
  name: 'playerControl',

  initialState,

  // 同步reducers
  reducers: {
    // 速率
    setPlaybackRate(state, { payload }) {
      state.playbackRate = payload;
    },

    // 音量值
    setVolume(state, { payload }) {
      state.volume = payload;
    },

    // 正在播放
    setIsPlaying(state, { payload }) {
      state.isPlaying = payload;
    },

    // 歌曲暂停
    setIsPause(state, { payload }) {
      state.isPause = payload;
    },

    // 当前播放时间
    setCurrentTime(state, { payload }) {
      state.currentTime = payload;
    },

    // 歌曲总时长
    setDuration(state, { payload }) {
      state.duration = payload;
    },

    // 歌曲播放完毕
    setIsEnded(state, { payload }) {
      state.isEnded = payload;
    },

    // 静音
    setIsMuted(state, { payload }) {
      state.muted = payload;
    },
  },

  // 异步reducers
  extraReducers: () => {},
});

export const {
  setPlaybackRate,
  setVolume,
  setIsPlaying,
  setIsPause,
  setCurrentTime,
  setDuration,
  setIsEnded,
  setIsMuted,
} = audioPlayerSlice.actions; // 同步的dispatch

export default audioPlayerSlice.reducer; // reducer
