import React, { memo, useEffect } from 'react';
import { Drawer } from 'antd';
import { DrawerStyles } from '@/renderer/components/Drawer/DrawerStyles';
import { useClickOutside } from '@/renderer/hooks/useClickOutside';

interface DrawerProps {
  drawerVisible: boolean;
  closeDrawer: () => void;
  handleAfterOpenChange?: (flag: boolean) => void;
  children: React.ReactNode;
}

/**
 * @description: 播放器的全局抽屉
 */
const DrawerCmp = ({
  children,
  drawerVisible,
  closeDrawer,
  handleAfterOpenChange = () => {},
}: DrawerProps) => {
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

  // 弹窗动画结束时触发，flag===true
  const afterOpenChange = (flag: boolean) => {
    handleAfterOpenChange && handleAfterOpenChange(flag);
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
          afterOpenChange={afterOpenChange}
        >
          {children}
        </Drawer>
      )}
    </DrawerStyles>
  );
};

export default memo(DrawerCmp);
