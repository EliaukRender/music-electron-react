import React, { memo, useEffect, useRef, useState } from 'react';
import { JukeBoxStyles } from '@/renderer/views/LyricFullScreen/styles/JukeBoxStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import gsap from 'gsap';

interface IProps {
  initWidth: number;
}

/**
 * @description: 唱片机
 */
const JukeBox = ({ initWidth }: IProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const rotateTween = useRef<gsap.TweenTarget>();

  const { isPlaying, activeSongId, activeSongList } = useSelector(
    (state: RootState) => ({
      isPlaying: state.audioPlayer.isPlaying,
      activeSongId: state.playerControl.activeSongId,
      activeSongList: state.playerControl.activeSongList,
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

  return (
    <JukeBoxStyles style={{ paddingRight: initWidth * 0.1 }}>
      <div
        className="juke-box"
        style={{
          width: 0.6 * initWidth,
          height: 0.6 * initWidth,
        }}
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
