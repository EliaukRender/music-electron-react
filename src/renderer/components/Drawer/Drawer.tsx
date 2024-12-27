import React, { memo } from 'react';
import { Drawer } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setDrawerVisible } from '@/renderer/store/modules/playerControlReducer';
import { DrawerStyles } from '@/renderer/components/Drawer/DrawerStyles';

interface DrawerProps {
  children: React.ReactNode;
}

/**
 * @description: 播放器的全局抽屉
 */
const DrawerCmp = ({ children }: DrawerProps) => {
  const dispatch = useDispatch();
  const { drawerVisible } = useSelector(
    (state: RootState) => ({
      drawerVisible: state.playerControl.drawerVisible,
    }),
    shallowEqual,
  );

  const onClose = () => {
    dispatch(setDrawerVisible(false));
  };

  return (
    <DrawerStyles>
      {drawerVisible && (
        <Drawer
          width={400}
          placement="right"
          autoFocus={false}
          destroyOnClose
          mask
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
