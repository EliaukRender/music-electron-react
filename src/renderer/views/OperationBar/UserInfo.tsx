import { memo } from 'react';
import { UserInfoStyles } from '@/renderer/views/OperationBar/styles/UserInfoStyles';
import { usePreventDefault } from '@/renderer/hooks/usePreventDefault';

/**
 * @description: 用户个人信息
 */
function UserInfo() {
  const { elementRef } = usePreventDefault();

  return (
    <UserInfoStyles ref={elementRef}>
      <img
        className="img"
        src={require('@/renderer/assets/images/user-icon.png')}
        alt=""
      />
      <div className="username">EliaukRender</div>
    </UserInfoStyles>
  );
}

export default memo(UserInfo);
