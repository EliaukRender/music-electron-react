import React, { memo, useState } from 'react';
import { Popover } from 'antd';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { MoveSongPopoverStyles } from '@/renderer/views/components/MoveSongPopover/MoveSongPopoverStyles';
import { handleMoveSongToSheet } from '@/renderer/store/actions/mainMenuActions';

interface PropsType {
  curSong: any;
  children: React.ReactNode;
}

/**
 * @description: 移动歌曲 到 指定歌单
 */
const MoveMusicPopover = ({ curSong, children }: PropsType) => {
  const [open, setOpen] = useState(false);
  const { sheetMenuList } = useSelector(
    (state: RootState) => ({
      sheetMenuList: state.mainMenu.sheetMenuList,
    }),
    shallowEqual,
  );

  // 打开/隐藏弹窗
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <MoveSongPopoverStyles>
      <Popover
        overlayClassName="move-music-popover"
        content={
          <>
            {/* 浮窗内容 */}
            {sheetMenuList?.map((item) => {
              return (
                <div
                  key={item.sheetId}
                  className="move-item"
                  onClick={() => {
                    setOpen(false);
                    handleMoveSongToSheet({ curSong, sheetId: item.sheetId });
                  }}
                >
                  <div>{item.sheetName}</div>
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
        {children}
      </Popover>
    </MoveSongPopoverStyles>
  );
};

export default memo(MoveMusicPopover);
