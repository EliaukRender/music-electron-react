import styled from 'styled-components';

export const AppStyles = styled.div`
  color: ${({ theme }) => theme.textColor.normal};

  /*  iconfont默认字体大小24px  */

  .iconfont {
    font-size: 24px;
    color: ${({ theme }) => theme.textColor.normal};
    line-height: 24px;
  }
`;
