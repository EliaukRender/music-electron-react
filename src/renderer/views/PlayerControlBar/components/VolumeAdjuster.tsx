import React, { memo, useState } from 'react';
import { Popover } from 'antd';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { VolumeAdjusterStyles } from '@/renderer/views/PlayerControlBar/styles/VolumeAdjusterStyles';
import VolumeSlide from '@/renderer/views/PlayerControlBar/components/VolumeSlide';

interface PropsType {
  isHover: boolean; // 鼠标是否进入控制区
  showLyrics: boolean;
}

/**
 * @description: 音量调节器
 */
const VolumeAdjuster = ({ isHover, showLyrics }: PropsType) => {
  const [open, setOpen] = useState(false);

  // 打开音量浮窗
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <VolumeAdjusterStyles>
      <Popover
        overlayClassName="volume-adjuster-popover"
        content={<VolumeSlide visible={open}></VolumeSlide>}
        destroyTooltipOnHide
        placement="top"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <motion.i
          className={classNames(
            'iconfont',
            'icon-volume-1',
            showLyrics ? 'icon-volume-1-show-lyrics' : '',
            open ? 'icon-volume-1-active' : '',
          )}
          initial={{ opacity: 0 }}
          animate={
            isHover || open
              ? {
                  opacity: 1,
                  transition: { duration: 0.5, ease: 'easeInOut' },
                }
              : {}
          }
        ></motion.i>
      </Popover>
    </VolumeAdjusterStyles>
  );
};

export default memo(VolumeAdjuster);
