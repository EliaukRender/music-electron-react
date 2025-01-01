import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  audio,
  getAnalyser,
} from '@/renderer/store/actions/audioPlayerActions';
import { shallowEqual, useSelector } from 'react-redux';
import AnalyzeClass from '@/renderer/utils/analyze/AnalyzeClass.js';
import { RootState } from '@/renderer/store';
import { AnalyzeCanvasStyles } from '@/renderer/views/LyricFullScreen/styles/AnalyzeCanvasStyles';

/**
 * @description: 频谱图
 */
const AnalyzeCanvas: React.FC = () => {
  const id = useRef(0); // 帧动画id
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(800);
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

  const hanResize = useCallback(() => {
    const ele = containerRef.current;
    if (ele) {
      const width = ele.getBoundingClientRect().width * 0.6;
      setCanvasWidth((prevState) => width);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      window.addEventListener('resize', hanResize);
    }

    return () => {
      if (container) {
        window.removeEventListener('resize', hanResize);
      }
    };
  }, [hanResize]);

  return (
    <AnalyzeCanvasStyles ref={containerRef}>
      <canvas
        className="analyze-canvas"
        ref={canvasRef}
        width={canvasWidth}
        height={160}
      />
    </AnalyzeCanvasStyles>
  );
};

export default memo(AnalyzeCanvas);
