import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';

// 每个bar的配置
const barsList = [
  {
    width: 2,
    height: 6,
    increasing: true,
  },
  {
    width: 2,
    height: 3,
    increasing: false,
  },
  {
    width: 2,
    height: 1,
    increasing: true,
  },
  {
    width: 2,
    height: 5,
    increasing: false,
  },
];
const barGap = 3; // 每一个bar之间的间隔距离

/**
 * @description: 音乐播放时的动态图标
 */
const DynamicsBars = memo(() => {
  const { isPlaying } = useSelector(
    (state: RootState) => ({
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [id, setId] = useState<number | null>(null);
  const canvasWidth = useMemo(() => {
    if (!barsList.length) return 0;
    return barsList.length * barsList[0].width + (barsList.length - 1) * barGap;
  }, [barsList]);

  /**
   * 音乐在播放时开始绘制canvas
   */
  useEffect(() => {
    if (isPlaying) {
      const tempId = setInterval(() => {
        drawBars();
      }, 10);
      // @ts-ignore
      setId(tempId);
    } else {
      id && clearInterval(id);
      setId(null);
    }

    function drawBars() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const cavWidth = canvas.width;
      const cavHeight = canvas.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, cavWidth, cavHeight);
      barsList.forEach((bar, index: number) => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
          index * (bar.width + barGap),
          cavHeight - bar.height,
          bar.width,
          bar.height,
        );

        if (bar.increasing) {
          bar.height += 0.2; // 增加高度
          if (bar.height >= cavHeight) {
            bar.increasing = false;
          }
        } else {
          bar.height -= 0.2; // 减少高度
          if (bar.height <= 0) {
            bar.increasing = true;
          }
        }
      });
    }
  }, [isPlaying]);

  /**
   * 销毁定时器
   */
  useEffect(() => {
    return () => {
      id && clearInterval(id);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={canvasWidth} height={10}></canvas>
    </div>
  );
});

export default DynamicsBars;
