import { memo, useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';

// 每个立柱的设置
const bars = [
  {
    width: 3,
    height: 6,
    increasing: true,
  },
  {
    width: 3,
    height: 3,
    increasing: false,
  },
  {
    width: 3,
    height: 1,
    increasing: true,
  },
  {
    width: 3,
    height: 5,
    increasing: false,
  },
];

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cavWidth = canvas.width;
    const cavHeight = canvas.height;
    const ctx = canvas.getContext('2d');

    if (isPlaying) {
      const tempId = setInterval(() => {
        draw();
      }, 10);
      // @ts-ignore
      setId(tempId);
    } else {
      id && clearInterval(id);
      setId(null);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, cavWidth, cavHeight);
      bars.forEach((bar, index) => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
          index * (bar.width + 3),
          cavHeight - bar.height,
          bar.width,
          bar.height,
        );

        if (bar.increasing) {
          bar.height += 0.1; // 增加高度
          if (bar.height >= cavHeight) {
            bar.increasing = false;
          }
        } else {
          bar.height -= 0.1; // 减少高度
          if (bar.height <= 0) {
            bar.increasing = true;
          }
        }
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      id && clearInterval(id);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={21} height={10}></canvas>
    </div>
  );
});

export default DynamicsBars;
