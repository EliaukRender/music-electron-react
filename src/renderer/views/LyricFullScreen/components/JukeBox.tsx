import React, { memo, useEffect, useMemo, useRef } from 'react';
import { JukeBoxStyles } from '@/renderer/views/LyricFullScreen/styles/JukeBoxStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import gsap from 'gsap';

interface IProps {
  initWidthHeight: { width: number; height: number };
}

/**
 * @description: 唱片机
 */
const JukeBox = ({ initWidthHeight }: IProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const rotateTween = useRef<gsap.core.Tween>();

  const { isPlaying } = useSelector(
    (state: RootState) => ({
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );

  // 控制图片的旋转动画
  useEffect(() => {
    if (!rotateTween.current) {
      rotateTween.current = gsap.to(imageRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
        paused: true,
      });
    } else {
      // @ts-ignore
      !isPlaying ? rotateTween.current.pause() : rotateTween.current.resume();
    }
  }, [isPlaying]);

  /**
   * 计算样式 todo
   */
  const juBoxStyles = useMemo(() => {
    return {
      width: initWidthHeight.width * 0.5,
      height: initWidthHeight.width * 0.5,
    };
  }, [initWidthHeight]);

  return (
    <JukeBoxStyles>
      <div
        className="juke-box"
        style={{ right: initWidthHeight.width * 0.1, ...juBoxStyles }}
      >
        <div className="circle-one">
          <div className="circle-two">
            <img
              ref={imageRef}
              className="image"
              src={require('@/renderer/assets/images/changpianji.png')}
              alt=""
            />
          </div>
        </div>
      </div>
    </JukeBoxStyles>
  );
};

export default memo(JukeBox);
