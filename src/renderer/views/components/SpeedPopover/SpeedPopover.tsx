import React, { memo, useState } from 'react';
import { Popover } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { SpeedPopoverStyles } from '@/renderer/views/components/SpeedPopover/SpeedPopoverStyles';
import { changePlaybackRate } from '@/renderer/store/actions/audioPlayerActions';

/**
 * @description: 倍速调节 popover
 */
const SpeedPopover = () => {
  const speedList = [0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0]; // 倍速列表
  const [open, setOpen] = useState(false);

  const { playbackRate } = useSelector(
    (state: RootState) => ({
      playbackRate: state.audioPlayer.playbackRate,
    }),
    shallowEqual,
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <SpeedPopoverStyles>
      <Popover
        overlayClassName="double-speed-popover"
        content={
          <>
            {speedList.map((item) => {
              return (
                <div
                  key={item}
                  className="speed-item"
                  onClick={() => {
                    setOpen(false);
                    changePlaybackRate(item);
                  }}
                >
                  <div>{item}</div>
                  {playbackRate === item && (
                    <i
                      className="iconfont icon-duigou"
                      style={{ color: '#00cc65' }}
                    ></i>
                  )}
                </div>
              );
            })}
          </>
        }
        placement="right"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div className="feat-item-has-arrow">
          <div className="feat-item">
            <i className="iconfont icon-beisu"></i>
            <div>倍速</div>
          </div>
          <i className="iconfont icon-youjiantou"></i>
        </div>
      </Popover>
    </SpeedPopoverStyles>
  );
};

export default memo(SpeedPopover);
