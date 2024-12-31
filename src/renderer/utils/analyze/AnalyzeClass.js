/**
 * @description: 频谱绘制
 */
import renderAnalyze from '@/renderer/utils/analyze/renderAnalyze.js';
import { getGradient } from '@/renderer/utils/analyze/tools.js';

class AnalyzeClass {
  /**
   * @description:  constructor
   * @param audio 音频对象 new Audio()
   * @param analyser 频谱分析器
   * @param canvas canvas元素实例
   * @param options Analyze的配置项
   */
  constructor(audio, analyser, canvas, options = {}) {
    // 初始options
    this.options = Object.assign(AnalyzeClass.getDefaultConfig, options);

    // 初始化频谱数据dataArray
    this.audio = audio;
    this.analyser = analyser;
    const bufferLen = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLen);

    // 获取canvas信息
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    const { width, height } = this.canvas.getBoundingClientRect();
    this.canvas.width = width;
    this.canvas.height = height;

    // 初始化渐变色
    if (this.options.isGradient) {
      this.options.gradient = getGradient(
        this.canvasCtx,
        this.canvas.width,
        this.options.colors,
      );
    }

    // 间隔渲染的计数器
    this.frameCount = 0;
  }

  /**
   * @description: 默认配置项
   */
  static get getDefaultConfig() {
    return {
      fftSize: 256, // fft长度
      maxFFTSize: 1024, // fft长度最大值
      mode: 'bars', // 频谱显示模式
      colors: ['#00cc65', '#87f7a2', '#007c39', '#00cc65'], // 频谱默认颜色
      stroke: 2, // 宽度
      bgColor: 'transparent', // 背景颜色
      isGradient: true, // 是否渐变
    };
  }

  /**
   * @description: 实时渲染频谱
   */
  renderFrame = () => {
    this.frameCount++;
    // getByteTimeDomainData时域数据、getByteFrequencyData频域数据
    this.options.mode === 'lightning'
      ? this.analyser.getByteTimeDomainData(this.dataArray)
      : this.analyser.getByteFrequencyData(this.dataArray);
    renderAnalyze.call(
      this,
      this.dataArray,
      this.canvas,
      this.frameCount,
      this.options,
    );
  };
}

export default AnalyzeClass;
