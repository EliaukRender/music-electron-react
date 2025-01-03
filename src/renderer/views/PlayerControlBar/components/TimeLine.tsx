import React, { memo } from 'react';
import { ConfigProvider, Slider } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import moment from 'moment';
import { RootState } from '@/renderer/store';
import { TimeLineStyles } from '@/renderer/views/PlayerControlBar/styles/TimeLine';
import { changeCurrentTime } from '@/renderer/store/actions/audioPlayerActions';
import classNames from 'classnames';

interface IProps {
  showLyrics: boolean;
}
/**
 * @description: 歌曲时间进度条
 */
const TimeLine = ({ showLyrics }: IProps) => {
  const { currentTime, duration } = useSelector(
    (state: RootState) => ({
      currentTime: state.audioPlayer.currentTime,
      duration: state.audioPlayer.duration,
    }),
    shallowEqual,
  );

  // 调节播放时间
  const onChange = (value: number) => {
    changeCurrentTime(value);
  };

  // 时间转换
  const formatTime = (seconds: number) => {
    return moment.utc(seconds * 1000).format('mm:ss');
  };

  return (
    <TimeLineStyles className="time-line">
      <div className={classNames('time', showLyrics ? 'time-show-lyric' : '')}>
        {formatTime(currentTime)}
      </div>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              railBg: '#ececec', // 轨道背景色
              trackBg: '#00cc65', // 已激活部分的颜色
              handleColor: '#00cc65', // 滑块颜色
              trackHoverBg: '#00cc65', // 滑块颜色
              dotActiveBorderColor: '#00cc65', // 圆点激活态边框颜色
              handleActiveOutlineColor: '#00cc65', // 滑块激活态外框色
              handleActiveColor: '#00cc65', // 滑块激活态边框色
              dotBorderColor: '#00cc65', // 圆点边框颜色
              dotSize: 5, // 滑块圆点尺寸
              handleLineWidthHover: 2, // 滑块边框宽度（悬浮态）
            },
          },
        }}
      >
        <Slider
          defaultValue={0}
          value={currentTime}
          min={0}
          max={duration}
          tooltip={{ formatter: null }}
          onChange={onChange}
        />
      </ConfigProvider>
      <div className={classNames('time', showLyrics ? 'time-show-lyric' : '')}>
        {formatTime(duration)}
      </div>
    </TimeLineStyles>
  );
};

export default memo(TimeLine);
