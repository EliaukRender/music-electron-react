import { createSlice } from '@reduxjs/toolkit';

/**
 * @description: 频谱分析器
 */
const analyzeReducer = createSlice({
  name: 'analyze',
  initialState: {
    // 绘制频谱图的默认配置
    canvasOptions: {
      fftSize: 256, // fft长度
      maxFFTSize: 1024, // fft长度最大值
      mode: 'bars', // 频谱显示模式
      colors: ['#00cc65', '#87f7a2', '#007c39', '#00cc65'], // 频谱默认颜色
      stroke: 2, // 宽度
      bgColor: 'transparent', // 背景颜色
      isGradient: true, // 是否渐变
    },
  },
  reducers: {
    // 保存频谱图形形状
    setMode(state, { payload }) {
      state.canvasOptions.mode = payload;
    },

    // 保存频率数量
    setFFTSize(state, { payload }) {
      state.canvasOptions.fftSize = payload;
    },

    // 保存颜色列表
    setColors(state, { payload }) {
      state.canvasOptions.colors = payload;
    },

    // 保存宽度
    setStroke(state, { payload }) {
      state.canvasOptions.stroke = payload;
    },
  },
  // 异步reducers
  extraReducers: (builder) => {},
});

export const { setMode, setFFTSize, setColors, setStroke } =
  analyzeReducer.actions;
export default analyzeReducer.reducer;
