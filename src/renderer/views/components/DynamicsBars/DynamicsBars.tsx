import { memo, useEffect, useMemo, useRef } from 'react';

const barWidth = 2;
const barGap = 3; // 每一个bar之间的间隔距离
const canvasHeight = 10;

/**
 * @description: 音乐播放时的动态图标
 */
const DynamicsBars = memo(() => {
  // 配置
  const barsList = [
    {
      height: 6,
      increasing: true,
    },
    {
      height: 3,
      increasing: false,
    },
    {
      height: 1,
      increasing: true,
    },
    {
      height: 5,
      increasing: false,
    },
  ];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const canvasWidth = useMemo(() => {
    if (!barsList.length) return 0;
    return barsList.length * barWidth + (barsList.length - 1) * barGap;
  }, [barsList]);

  /**
   * 音乐在播放时开始绘制canvas
   */
  useEffect(() => {
    timerId.current = setInterval(() => {
      drawBars();
    }, 10);

    // 绘制canvas
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
          index * (barWidth + barGap),
          cavHeight - bar.height,
          barWidth,
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

    return () => {
      timerId.current && clearInterval(timerId.current); // 销毁定时器
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
    </div>
  );
});

export default DynamicsBars;
