import { useEffect, useState } from 'react';
import {
  IContextMenuItem,
  IContextMenuPosition,
} from '@/renderer/types/contextMenu';
import Emitter from '@/renderer/eventBus/event-emitter';
import EventBusEnum from '@/renderer/eventBus/modules/eventBusEnum';

/**
 * 鼠标右键
 */
export const useContextMenu = () => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [menu, setContextMenu] = useState<IContextMenuItem[]>([]);
  const [pos, setPosition] = useState<IContextMenuPosition>({
    x: 0,
    y: 0,
  });

  // 响应鼠标右键事件
  const handleContextMenu = ({
    contextMenu,
    position,
  }: {
    contextMenu: IContextMenuItem[];
    position: { x: number; y: number };
  }) => {
    setContextMenuVisible(false);
    setContextMenu(contextMenu);
    setPosition(position);
    setContextMenuVisible(!!contextMenu?.length);
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  useEffect(() => {
    Emitter.on(EventBusEnum.ContextMenu, handleContextMenu); // 监听鼠标右键事件

    return () => {
      Emitter.off(EventBusEnum.ContextMenu, handleContextMenu);
    };
  }, []);

  return {
    contextMenuVisible,
    hideContextMenu,
    x: pos.x,
    y: pos.y,
    menu,
  };
};
