import React, { memo, useState } from 'react';
import { Popover } from 'antd';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { PlayModeStyles } from '@/renderer/views/PlayerControlBar/styles/PlayModeStyles';
import { changeMusicMode } from '@/renderer/store/actions/PlayerControlActions';

interface PropsType {
  isHover: boolean; // 鼠标是否进入控制区
  showLyrics: boolean;
}

/**
 * @description: 音乐播放模式：随机播放、顺序播放、单曲循环
 */
const PlayMode = ({ isHover, showLyrics }: PropsType) => {
  const [open, setOpen] = useState(false);
  const [curModeIcon, setCurModeIcon] = useState('icon-shunxubofang');
  const modeList = [
    { mode: 1, name: '顺序播放', icon: 'icon-shunxubofang' },
    { mode: 2, name: '随机播放', icon: 'icon-suijibofang' },
    { mode: 3, name: '单曲循环', icon: 'icon-danquxunhuan' },
  ];

  // 打开音量浮窗
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  // 点击模式图标
  const handleClick = (item: any) => {
    setCurModeIcon(item.icon);
    setOpen(false);
    changeMusicMode(item.mode);
  };

  return (
    <PlayModeStyles>
      <Popover
        overlayClassName="music-mode-popover"
        content={
          <>
            {modeList.map((item) => {
              return (
                <div
                  key={item.mode}
                  className="mode-item"
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  <i className={classNames('iconfont', item.icon)}></i>
                  <div>{item.name}</div>
                </div>
              );
            })}
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
            curModeIcon,
            showLyrics ? 'icon-show-lyrics' : '',
            open ? 'icon-active' : '',
          )}
          initial={{ opacity: 0 }}
          animate={
            isHover || open
              ? { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }
              : {}
          }
        ></motion.i>
      </Popover>
    </PlayModeStyles>
  );
};

export default memo(PlayMode);
