import React, { memo, useEffect, useRef, useState } from 'react';
import { JukeBoxStyles } from '@/renderer/views/LyricFullScreen/styles/JukeBoxStyles';
import { shallowEqual, useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '@/renderer/store';

/**
 * @description: 唱片机
 */
const JukeBox = () => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [deg, setDeg] = useState(0);
  const [id, setId] = useState();
  const { isPlaying } = useSelector(
    (state: RootState) => ({
      isPlaying: state.audioPlayer.isPlaying,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const innerEle = innerRef.current as HTMLDivElement;
    if (innerEle) {
      // 生成30个圆环模拟纹路效果
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i < 25; i++) {
        const ring = document.createElement('div');
        ring.classList.add('line');
        ring.style.width = `${330 - i * 4}px`;
        ring.style.height = `${330 - i * 4}px`;
        innerEle.appendChild(ring);
      }
    }
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      clearInterval(id);
      return;
    }
    // 更新旋转角度
    const idValue = setInterval(() => {
      setDeg((pre) => pre + 0.2);
    }, 50);
    // @ts-ignore
    setId(idValue);
  }, [isPlaying]);

  return (
    <JukeBoxStyles>
      <div className="box">
        <div className="outer">
          <div
            className="inner"
            ref={innerRef}
            style={{
              transform: `rotate(${deg}deg)`,
              transition: 'transform 50ms linear',
            }}
          >
            <img
              ref={imageRef}
              style={{
                transform: `rotate(${deg}deg)`,
                transition: 'transform 50ms linear',
              }}
              className={classNames('image', isPlaying ? '' : '')}
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
