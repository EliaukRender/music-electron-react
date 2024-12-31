import { createSlice } from '@reduxjs/toolkit';

interface IState {
  fullScreen: boolean; // 全屏
  minScreen: boolean; // 最小化
  maxScreen: boolean; // 最大化
}

const initialState: IState = {
  fullScreen: false,
  minScreen: false,
  maxScreen: false,
};

/**
 * @description: 全局数据
 */
const globalSlice = createSlice({
  name: 'global',

  initialState,

  // 同步reducers
  reducers: {
    setFullScreen(state, { payload }) {
      console.log('全屏', payload);
      state.fullScreen = payload;
    },

    setMinScreen(state, { payload }) {
      state.minScreen = payload;
    },

    setMaxScreen(state, { payload }) {
      console.log('setMaxScreen', payload);
      state.maxScreen = payload;
    },
  },

  // 异步reducers
  extraReducers: () => {},
});

export const { setFullScreen, setMinScreen, setMaxScreen } =
  globalSlice.actions; // 同步的dispatch
export default globalSlice.reducer; // reducer
