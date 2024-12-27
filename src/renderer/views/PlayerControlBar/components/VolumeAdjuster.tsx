import React, { memo, useState } from 'react';
import { ConfigProvider, Divider, Popover, Slider } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { RootState } from '@/renderer/store';
import { changeVolume } from '@/renderer/store/actions/audioPlayerActions';
import { VolumeAdjusterStyles } from '@/renderer/views/PlayerControlBar/styles/VolumeAdjusterStyles';

interface PropsType {
  isHover: boolean; // 鼠标是否进入控制区
}

/**
 * @description: 音量调节器
 */
const VolumeAdjuster = ({ isHover }: PropsType) => {
  const [open, setOpen] = useState(false);

  const { volume } = useSelector(
    (state: RootState) => ({
      volume: state.audioPlayer.volume,
    }),
    shallowEqual,
  );

  // 打开音量浮窗
  const handleOpenChange = (newOpen: boolean) => {
    console.log('newOpen', newOpen);
    setOpen(newOpen);
  };

  // 改变音量
  const onChange = (value: number) => {
    console.log('音量', value);
    changeVolume(value);
  };

  return (
    <VolumeAdjusterStyles>
      <Popover
        overlayClassName="volume-adjuster-popover"
        content={
          <>
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
                vertical
                defaultValue={volume}
                tooltip={{ formatter: null }}
                step={2}
                onChange={onChange}
              />
            </ConfigProvider>
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
          </>
        }
        placement="top"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <motion.i
          className={classNames(
            'iconfont',
            'icon-volume-1',
            open ? 'sound-active' : '',
          )}
          initial={{ opacity: 0 }}
          animate={
            isHover || open
              ? { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }
              : {}
          }
        ></motion.i>
      </Popover>
    </VolumeAdjusterStyles>
  );
};

export default memo(VolumeAdjuster);
