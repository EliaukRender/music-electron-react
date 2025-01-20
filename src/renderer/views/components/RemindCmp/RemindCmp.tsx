import { memo } from 'react';
import { RemindCmpStyles } from '@/renderer/views/components/RemindCmp/RemindCmpStyles';

interface RemindCmpProps {
  img?: string;
  text?: string;
}

/**
 * @description: 提示组件
 */
const RemindCmp = memo(({ img, text }: RemindCmpProps) => {
  return (
    <RemindCmpStyles>
      <div className="remind-cmp">
        <img
          src={
            img || require('@/renderer/assets/images/message/developing.png')
          }
          className="img"
          alt=""
        />
        <div className="text">{text || '正在开发中...'}</div>
      </div>
    </RemindCmpStyles>
  );
});

export default RemindCmp;
