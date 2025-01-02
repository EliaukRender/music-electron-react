import { createSlice } from '@reduxjs/toolkit';

interface IState {
  isFullScreen: boolean; // 是否全屏
  isMinimize: boolean; // 是否最小化
  isMaximize: boolean; // 是否最大化
}

const initialState: IState = {
  isFullScreen: false,
  isMinimize: false,
  isMaximize: false,
};

/**
 * @description: 全局数据
 */
const globalSlice = createSlice({
  name: 'global',

  initialState,

  // 同步reducers
  reducers: {
    setIsFullScreen(state, { payload }) {
      state.isFullScreen = payload;
    },

    setIsMinimize(state, { payload }) {
      state.isMinimize = payload;
    },

    setIsMaximize(state, { payload }) {
      state.isMaximize = payload;
    },
  },

  // 异步reducers
  extraReducers: () => {},
});

export const { setIsFullScreen, setIsMinimize, setIsMaximize } =
  globalSlice.actions; // 同步的dispatch
export default globalSlice.reducer; // reducer
