import { memo } from 'react';
import { UserInfoStyles } from '@/renderer/views/OperationBar/styles/UserInfoStyles';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

/**
 * @description: 用户个人信息
 */
function UserInfo() {
  const { stopPropagationEleRef } = useStopPropagation();

  return (
    <UserInfoStyles ref={stopPropagationEleRef}>
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
