import React, { memo } from 'react';
import { OperationBarStyles } from '@/renderer/views/Layout/components/styles/OperationBarStyles';
import NavigateSearch from '@/renderer/views/Layout/components/OperationBar/NavigateSearch';
import UserInfo from '@/renderer/views/Layout/components/OperationBar/UserInfo';
import Tools from '@/renderer/views/Layout/components/OperationBar/Tools';

/**
 * @description: 顶部操作栏区域
 */
const OperationBar: React.FC = () => {
  return (
    <OperationBarStyles>
      <NavigateSearch></NavigateSearch>
      <UserInfo></UserInfo>
      <Tools></Tools>
    </OperationBarStyles>
  );
};

export default memo(OperationBar);
