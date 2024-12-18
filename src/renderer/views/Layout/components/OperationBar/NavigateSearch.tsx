import React, { memo } from 'react';
import { NavigateSearchStyles } from '@/renderer/views/Layout/components/styles/NavigateSearchStyles';

/**
 * @description: 页面跳转按钮、 音乐搜索框
 */
const NavigateSearch: React.FC = () => {
  return (
    <NavigateSearchStyles>
      <i className="iconfont icon-zuojiantou"></i>
      <i className="iconfont icon-youjiantou"></i>
      <input type="text" className="input" />
    </NavigateSearchStyles>
  );
};

export default memo(NavigateSearch);
