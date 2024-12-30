import React, { memo, useEffect, useMemo, useRef } from 'react';
import { JukeBoxStyles } from '@/renderer/views/LyricFullScreen/styles/JukeBoxStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import gsap, { GSAPTween } from 'gsap';

/**
 * @description: 唱片机
 */
const JukeBox = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const rotateTween = useRef<GSAPTween>();
  const { isPlaying, activeSongId, activeSongList } = useSelector(
    (state: RootState) => ({
      isPlaying: state.audioPlayer.isPlaying,
      activeSongId: state.playerControl.activeSongId,
      activeSongList: state.playerControl.activeSongList,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (!rotateTween.current) {
      // 创建旋转动画
      rotateTween.current = gsap.to('.image', {
        rotation: 360, // 旋转360度
        duration: 10, // 设置动画持续时间
        repeat: -1, // 无限循环
        ease: 'none', // 不做缓动，保持匀速旋转
        paused: true, // 初始状态为暂停
      });
    }
    console.log('isPlaying', isPlaying);
    !isPlaying ? rotateTween.current.pause() : rotateTween.current.resume();
  }, [isPlaying]);

  return (
    <JukeBoxStyles>
      <div className="box">
        <div className="outer">
          <div className="inner">
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
