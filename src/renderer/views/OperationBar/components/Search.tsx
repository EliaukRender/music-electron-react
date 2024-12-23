import React, { memo, useRef, useState } from 'react';
import { SearchStyles } from '@/renderer/views/OperationBar/styles/SearchStyles';
import classNames from 'classnames';
import { usePreventDefault } from '@/renderer/hooks/usePreventDefault';

/**
 * @description: 页面跳转按钮、 音乐搜索框
 */
const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const { elementRef } = usePreventDefault();

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
    <SearchStyles
      ref={elementRef}
      onMouseDown={(event) => {
        console.log('down');
        event.preventDefault();
        event.stopPropagation();
      }}
    >
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
    </SearchStyles>
  );
};

export default memo(Search);
