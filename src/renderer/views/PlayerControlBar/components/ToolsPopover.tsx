import React, { memo, useState } from 'react';
import { ToolsPopoverStyles } from '@/renderer/views/PlayerControlBar/styles/ToolsPopoverStyles';
import classNames from 'classnames';
import SpeedPopover from '@/renderer/views/components/SpeedPopover/SpeedPopover';
import MoveMusicPopover from '@/renderer/views/components/MoveSongPopover/MoveSongPopover';
import { Popover } from 'antd';
import DeleteSong from '@/renderer/views/components/DeleteSong/DeleteSong';

interface IProps {
  showLyrics: boolean;
}

/**
 * @description: 歌曲控制工具popover
 */
const ToolsPopover = ({ showLyrics }: IProps) => {
  const [open, setOpen] = useState(false);

  // 打开功能操作浮窗
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <ToolsPopoverStyles>
      <Popover
        overlayClassName="music-feat-popover"
        content={
          <>
            <SpeedPopover></SpeedPopover>
            <MoveMusicPopover curSong={{}}>
              <div className="feat-item-has-arrow">
                <div className="feat-item">
                  <i className="iconfont icon-tianjia"></i>
                  <div>添加到</div>
                </div>
                <i className="iconfont icon-youjiantou"></i>
              </div>
            </MoveMusicPopover>
            <DeleteSong onlyShowDeleteIcon={false}></DeleteSong>
          </>
        }
        placement="top"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <i
          className={classNames(
            'iconfont',
            'icon-shenglve',
            showLyrics ? 'icon-shenglve-show-lyrics' : '',
            open ? 'icon-shenglve-active' : '',
          )}
        ></i>
      </Popover>
    </ToolsPopoverStyles>
  );
};

export default memo(ToolsPopover);
