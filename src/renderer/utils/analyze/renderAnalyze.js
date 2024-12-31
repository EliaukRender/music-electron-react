import drawBars from '@/renderer/utils/analyze/drawBars.js';
import drawLightBars from '@/renderer/utils/analyze/drawLightBars.js';
import drawerDoubleBars from '@/renderer/utils/analyze/drawerDoubleBars.js';

/**
 * @description: 不同绘制模式的方法枚举
 */
const modeMap = {
  bars: drawBars,
  lightBars: drawLightBars,
  doubleBars: drawerDoubleBars,
};

/**
 * @description: 绘制频率
 */
const frameRateMap = {
  bars: 2,
  lightBars: 2,
  doubleBars: 2,
};

/**
 * @description: 默认配置信息
 */
let canvasOptions = {};

/**
 * @description: 处理频谱的渲染
 * @param dataArray  频谱数据
 * @param canvas  HTML元素
 * @param frameCount 渲染频率计数值
 * @param customOptions 用户自定义配置
 */
const renderAnalyze = (dataArray, canvas, frameCount, customOptions = {}) => {
  if (!canvas) {
    return;
  }
  canvasOptions = { ...customOptions };
  if (!canvasOptions.stroke) canvasOptions.stroke = 1;
  if (!canvasOptions.colors)
    canvasOptions.colors = ['#00cc65', '#87f7a2', '#007c39', '#00cc65'];

  const canvasCtx = canvas.getContext('2d');
  const { height } = canvas;
  const { width } = canvas;

  // 基于渲染设置先判断这一帧是否渲染
  if (frameCount % frameRateMap[canvasOptions.mode] === 0) {
    // 清除旧数据
    canvasCtx.clearRect(0, 0, width, height);
    canvasCtx.beginPath();

    // mode===none时不绘制z
    if (canvasOptions.mode === 'none') {
      return;
    }
    // 调用不同模式的绘制方法
    modeMap[canvasOptions.mode]({
      dataArray,
      canvasOptions,
      canvasCtx,
      height,
      width,
    });
  }
};

export default renderAnalyze;
