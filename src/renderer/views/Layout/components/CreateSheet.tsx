import React, { memo, useEffect, useRef, useState } from 'react';
import { CreateSheetStyles } from '@/renderer/views/Layout/styles/CreateSheetStyles';
import { Input, InputRef } from 'antd';
import { handleCreateSheet } from '@/renderer/store/actions/mainMenuActions';
import defaultPic from '@/renderer/assets/images/default-sheet-pic.png';
import { SheetMenuItemType } from '@/renderer/types/menuTypes';

interface IProps {
  showCreateInput: boolean;
  sheetMenuList: SheetMenuItemType[];
  finishCreate: (success: boolean) => void;
}

/**
 * 新建歌单
 */
const CreateSheet = memo(
  ({ finishCreate, showCreateInput, sheetMenuList }: IProps) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef | null>(null);

    const onChange = (e: any) => {
      setInputValue(e.target.value.trim());
    };

    // Input失焦的时候请求接口创建歌单
    const onBlur = async () => {
      // todo 成功后直接返回新建的歌单信息
      const res = await handleCreateSheet({
        sheetName: inputValue,
        sheetIcon: 'aaaa',
      });
      finishCreate(res);
    };

    useEffect(() => {
      if (!showCreateInput) return;
      setInputValue(`新建歌单${sheetMenuList.length + 1}`);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }, [sheetMenuList.length, showCreateInput]);

    return (
      <CreateSheetStyles>
        <div className="create-sheet">
          <img className="song-pic" src={defaultPic} alt="" />
          <Input
            ref={inputRef}
            className="input-create-sheet"
            value={inputValue}
            onChange={onChange}
            onBlur={onBlur}
          ></Input>
        </div>
      </CreateSheetStyles>
    );
  },
);

export default CreateSheet;
