import React, { memo, useState } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/rendererInteraction/windowUi';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { set } from 'lodash';
import { CloseAppStyles } from '@/renderer/views/OperationBar/styles/CloseAppStyles';

/**
 * @description: 关闭app按钮
 */
const CloseApp = memo(() => {
  // windowUIEmitter.closeApp
  const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useState(false);

  const onOk = () => {
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <CloseAppStyles>
      <i
        className="iconfont icon-guanbi"
        onClick={windowUIEmitter.closeApp}
      ></i>
    </CloseAppStyles>
  );
});

export default CloseApp;
