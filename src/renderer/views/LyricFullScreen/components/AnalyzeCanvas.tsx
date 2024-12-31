import React, { memo, useEffect, useRef } from 'react';
import {
  audio,
  getAnalyser,
} from '@/renderer/store/actions/audioPlayerActions';
import { shallowEqual, useSelector } from 'react-redux';
import AnalyzeClass from '@/renderer/utils/analyze/AnalyzeClass.js';
import { RootState } from '@/renderer/store';

/**
 * @description: 频谱图
 */
const AnalyzeCanvas: React.FC = () => {
  const id = useRef(0); // 帧动画id
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // canvas配置
  const { canvasOptions, isPlaying } = useSelector(
    (state: RootState) => ({
      canvasOptions: state.analyze.canvasOptions,
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(id.current);
      return;
    }
    const analyser = getAnalyser();
    const instanceAnalyze = new AnalyzeClass(
      audio,
      analyser,
      canvasRef.current,
      canvasOptions,
    );

    const renderAnalyze = () => {
      if (id.current || canvasOptions.mode === 'none') {
        cancelAnimationFrame(id.current); // 清除绘制
      }
      instanceAnalyze.renderFrame();
      id.current = requestAnimationFrame(renderAnalyze);
    };

    renderAnalyze(); // 开始绘制
  }, [canvasOptions, isPlaying]);

  return (
    <canvas
      className="analyze-canvas"
      ref={canvasRef}
      width={800}
      height={160}
    />
  );
};

export default memo(AnalyzeCanvas);
