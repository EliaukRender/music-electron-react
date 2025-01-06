import React, { memo, useState } from 'react';
import { CreateSheetStyles } from '@/renderer/views/Layout/styles/CreateSheetStyles';
import { Input, Modal } from 'antd';
import { handleCreateSheet } from '@/renderer/store/actions/mainMenuActions';
import { addSheetIconList } from '@/renderer/constant';
import classNames from 'classnames';

const { TextArea } = Input;

/**
 * 新建歌单
 */
const CreateSheet: React.FC = memo(() => {
  const [open, setOpen] = useState(false);
  const [curIconName, setCurIconName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');

  const onChange = (e: any) => {
    setInputValue(e.target.value.trim());
  };

  const onTextareaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTextAreaValue(e.target.value.trim());
  };

  const onCancel = () => {
    setOpen(false);
  };

  const onOk = async () => {
    if (!inputValue) {
      return;
    }
    if (!curIconName) {
      return;
    }
    const res = await handleCreateSheet({
      sheetName: inputValue,
      sheetIcon: curIconName,
    });
    res && setOpen(false);
  };

  return (
    <CreateSheetStyles>
      <i className="iconfont icon-jia" onClick={() => setOpen(true)}></i>
      <Modal
        className="create-sheet-modal"
        mask={false}
        title="创建歌单"
        centered
        open={open}
        okText="创建"
        cancelText="取消"
        onOk={() => onOk()}
        onCancel={() => onCancel()}
      >
        <div className="content">
          <div className="content-item">
            <div className="title">歌单名称：</div>
            <Input
              value={inputValue}
              onChange={onChange}
              rootClassName="input-text"
              showCount
              maxLength={8}
            ></Input>
          </div>
          <div className="content-item">
            <div className="title">歌单图标：</div>
            <div className="icon-list">
              {addSheetIconList.map((item: string) => {
                return (
                  <i
                    className={classNames(
                      'iconfont',
                      item,
                      item === curIconName ? 'selected' : '',
                    )}
                    onClick={() => {
                      setCurIconName(item);
                    }}
                  ></i>
                );
              })}
            </div>
          </div>
          <div className="content-item">
            <div className="title">歌单描述：</div>
            <div className="desc">
              <TextArea
                className="input-text"
                showCount
                maxLength={50}
                onChange={onTextareaChange}
                placeholder="请输入歌单描述说明~"
                style={{ height: 50 }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </CreateSheetStyles>
  );
});

export default CreateSheet;
