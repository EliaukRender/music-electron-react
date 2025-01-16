import React, { memo, useState } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/mainWindow/windowUi';
import { Modal } from 'antd';
import { CloseAppStyles } from '@/renderer/views/OperationBar/styles/CloseAppStyles';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

/**
 * @description: 关闭app按钮
 */
const CloseApp: React.FC = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation();
  const [open, setOpen] = useState(false);

  const onOk = () => {
    windowUIEmitter.closeApp();
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <CloseAppStyles ref={stopPropagationEleRef}>
      <i className="iconfont icon-guanbi" onClick={() => setOpen(true)}></i>
      <Modal
        className="close-app-modal"
        title="退出APP"
        centered
        open={open}
        okText="退出"
        cancelText="取消"
        onOk={() => onOk()}
        onCancel={() => onCancel()}
      >
        <p>您确认退出Eliauk音乐吗？</p>
      </Modal>
    </CloseAppStyles>
  );
});

export default CloseApp;
