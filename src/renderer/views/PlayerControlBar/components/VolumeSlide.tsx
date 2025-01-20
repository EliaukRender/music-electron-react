import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { VolumeSlideStyles } from '@/renderer/views/PlayerControlBar/styles/VolumeSlideStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { changeVolume } from '@/renderer/store/actions/audioPlayerActions';
import { Divider } from 'antd';

interface IProps {
  visible: boolean;
}

/**
 * @description: 音量调节滑块
 */
const VolumeSlide = memo(({ visible }: IProps) => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startY, setStartY] = useState(0);

  const { volume } = useSelector(
    (state: RootState) => ({
      volume: state.audioPlayer.volume,
    }),
    shallowEqual,
  );

  // 改变音量
  const handleChange = useCallback(
    (value: number) => {
      // console.log(value, volume);
      if (volume === 100 && value >= 100) return;
      if (volume === 0 && value <= 0) return;
      let val = value;
      if (value >= 100) {
        val = 100;
      }
      if (value <= 0) {
        val = 0;
      }
      changeVolume(val);
    },
    [volume],
  );

  // 处理鼠标滑轮事件
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!visible) return;
      if (e.deltaY > 0) {
        handleChange(volume - 10);
      } else {
        handleChange(volume + 10);
      }
    },
    [handleChange, visible, volume],
  );

  /**
   *  鼠标滚轮控制音量
   */
  useEffect(() => {
    document.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel, visible]);

  // 鼠标按下
  const handleMouseDown = useCallback((e: MouseEvent) => {
    // console.log('down', e.clientY);
    setIsMouseDown((prevState) => true);
    setStartY(e.clientY);
  }, []);

  // 鼠标移动
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isMouseDown) return;
      // 加音量
      if (startY - e.clientY > 0) {
        if (volume === 100) return;
        handleChange(volume + 1);
      } else {
        // 减音量
        handleChange(volume - 1);
      }
      setStartY((prevState) => e.clientY);
    },
    [handleChange, isMouseDown, startY, volume],
  );

  // 鼠标松开
  const handleMouseUp = useCallback(() => {
    setIsMouseDown((prevState) => false);
  }, []);

  /**
   *  控鼠标拖拽圆圈控制音量
   */
  useEffect(() => {
    const dotEle = dotRef.current;
    if (dotEle) {
      dotEle.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      if (dotEle) {
        dotEle.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove]);

  return (
    visible && (
      <VolumeSlideStyles>
        <div className="volume-slide">
          <div className="line"></div>
          <div className="active-line" style={{ height: `${volume}%` }}></div>
          <div
            className="dot"
            ref={dotRef}
            style={{ bottom: `${volume}%` }}
          ></div>
        </div>
        <div className="volume-value">{volume}%</div>
        <Divider />
        {volume ? (
          <i
            className="iconfont icon-volume-1"
            style={{ marginTop: '10px' }}
          ></i>
        ) : (
          <i
            className="iconfont icon-volume-x"
            style={{ marginTop: '10px' }}
          ></i>
        )}
      </VolumeSlideStyles>
    )
  );
});

export default VolumeSlide;
