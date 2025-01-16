import React, { memo, useEffect } from 'react';
import { IContextMenuItem } from '@/renderer/types/contextMenu';
import { ContextMenuStyles } from '@/renderer/views/ContextMenu/ContextMenuStyles';
import { useClickOutside } from '@/renderer/hooks/useClickOutside';

interface IProps {
  x: number;
  y: number;
  contextMenu: IContextMenuItem[];
  hideContextMenu: () => void;
}

/**
 * @description: 鼠标右键组件
 */
const ContextMenu = memo(({ x, y, contextMenu, hideContextMenu }: IProps) => {
  const { isClickOutside, clickOutSideRef } = useClickOutside({
    needWatch: !!contextMenu?.length,
  });

  // 点击菜单项
  const handleClickContextMenu = (item: IContextMenuItem) => {
    if (!item.onClick || item?.disabled) {
      hideContextMenu();
      return;
    }
    item.onClick();
    hideContextMenu();
  };

  // 点击外部时关闭右键菜单
  useEffect(() => {
    if (isClickOutside) {
      hideContextMenu();
    }
  }, [hideContextMenu, isClickOutside]);

  return (
    <ContextMenuStyles ref={clickOutSideRef}>
      <div
        className="context-menu"
        style={{
          left: `${x + 15}px`,
          top: `${y - 10}px`,
        }}
      >
        {contextMenu.map((item, index) => {
          return (
            <div
              className={`context-menu-item ${item.disabled ? 'context-menu-item-disabled' : ''}`}
              key={index}
              onClick={() => handleClickContextMenu(item)}
            >
              <i className={`iconfont ${item.icon}`}></i>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </ContextMenuStyles>
  );
});

export default ContextMenu;
