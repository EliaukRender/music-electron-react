import React, { memo, useRef, useState } from 'react';
import { NavigateSearchStyles } from '@/renderer/views/OperationBar/styles/NavigateSearchStyles';
import classNames from 'classnames';

/**
 * @description: 页面跳转按钮、 音乐搜索框
 */
const NavigateSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [keyWord, setKeyWord] = useState('');

  const handleInputClick = () => {
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setIsFocus(true);
  };

  const handleInputBlur = () => {
    setIsFocus(false);
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  const handleInputChange = () => {
    if (!inputRef.current) return;
    setKeyWord(inputRef.current.value);
  };

  return (
    <NavigateSearchStyles>
      <i className="iconfont icon-zuojiantou"></i>
      <i className="iconfont icon-youjiantou"></i>
      <div className="input-box">
        <input
          type="text"
          className="input"
          placeholder=""
          ref={inputRef}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
        <i
          className={classNames(
            'iconfont icon-sousuo',
            isFocus ? 'icon-sousuo-focus' : 'icon-sousuo-nonfocus',
          )}
        ></i>
      </div>
    </NavigateSearchStyles>
  );
};

export default memo(NavigateSearch);
