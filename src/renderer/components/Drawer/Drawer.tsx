import React, { memo, useEffect } from 'react';
import { Drawer } from 'antd';
import { DrawerStyles } from '@/renderer/components/Drawer/DrawerStyles';
import { useClickOutside } from '@/renderer/hooks/useClickOutside';

interface DrawerProps {
  drawerVisible: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
}

/**
 * @description: 播放器的全局抽屉
 */
const DrawerCmp = ({ children, drawerVisible, closeDrawer }: DrawerProps) => {
  const { isClickOutside, clickOutSideRef } = useClickOutside({
    needWatch: drawerVisible,
  });

  useEffect(() => {
    isClickOutside && onClose();
  });

  // 关闭窗口
  const onClose = () => {
    drawerVisible && closeDrawer();
  };

  return (
    <DrawerStyles ref={clickOutSideRef}>
      {drawerVisible && (
        <Drawer
          width={400}
          placement="right"
          autoFocus={false}
          destroyOnClose
          mask={false}
          maskClosable
          closable={false}
          onClose={onClose}
          open={drawerVisible}
          getContainer={false}
        >
          {children}
        </Drawer>
      )}
    </DrawerStyles>
  );
};

export default memo(DrawerCmp);
