import React, { memo, useRef, useState } from 'react';
import { SearchStyles } from '@/renderer/views/OperationBar/styles/SearchStyles';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';
import { Input, InputRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/**
 * @description: 页面跳转按钮、 音乐搜索框
 */
const Search: React.FC = () => {
  const inputRef = useRef<InputRef | null>(null);
  const [keyWord, setKeyWord] = useState('');
  const { stopPropagationEleRef } = useStopPropagation();

  const handleInputChange = (event: any) => {
    setKeyWord(event.target.value);
  };

  // @ts-ignore
  return (
    <SearchStyles
      ref={stopPropagationEleRef}
      onMouseDown={(event) => {
        console.log('down');
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div className="input-box">
        <Input
          ref={inputRef}
          className="search-input"
          placeholder="搜索音乐"
          variant="filled"
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={handleInputChange}
        />
      </div>
    </SearchStyles>
  );
};

export default memo(Search);
