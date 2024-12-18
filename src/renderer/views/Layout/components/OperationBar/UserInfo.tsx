import { memo } from 'react';
import { UserInfoStyles } from '@/renderer/views/Layout/components/styles/UserInfoStyles';

/**
 * @description: 用户个人信息
 */
function UserInfo() {
  return (
    <UserInfoStyles>
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
