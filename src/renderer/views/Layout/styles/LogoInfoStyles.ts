import styled from 'styled-components';

export const LogoInfoStyles = styled.div`
  .logo-info {
    display: flex;
    align-items: center;
    padding: 25px 15px 25px 15px;

    .img {
      width: 36px;
    }

    .title {
      margin-left: 10px;
      font-size: 22px;
      font-weight: 600;
      font-family: Alimama;
      color: ${({ theme }) => theme.textColor.normal};
    }
  }

  /* 菜单折叠时样式重置 */
  .logo-info-collapse {
    justify-content: center;

    .img {
      width: 40px;
    }
  }
`;
