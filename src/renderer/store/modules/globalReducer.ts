import { createSlice } from '@reduxjs/toolkit';

/**
 * @description: 全局数据
 */
const globalSlice = createSlice({
  name: 'global',

  initialState: {
    scrollY: 0, // 页面在Y轴方向滚动值
    scrollDirection: '', // up-往上； down-往下
  },

  // 同步reducers
  reducers: {
    // 保存最新的scrollY值
    setScrollY(state, { payload }) {
      state.scrollY = payload;
    },
    // 网页滚动的方向
    setScrollDirection(state, { payload }) {
      state.scrollDirection = payload;
    },
  },

  // 异步reducers
  extraReducers: () => {},
});

export const { setScrollY, setScrollDirection } = globalSlice.actions; // 同步的dispatch
export default globalSlice.reducer; // reducer
