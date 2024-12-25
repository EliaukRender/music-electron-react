import { memo } from 'react';
import { UserInfoStyles } from '@/renderer/views/OperationBar/styles/UserInfoStyles';
import { useForbidMouseDown } from '@/renderer/hooks/useForbidMouseDown';

/**
 * @description: 用户个人信息
 */
function UserInfo() {
  const { forbidMouseDownEleRef } = useForbidMouseDown();

  return (
    <UserInfoStyles ref={forbidMouseDownEleRef}>
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
