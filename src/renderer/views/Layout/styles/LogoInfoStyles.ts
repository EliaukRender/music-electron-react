import styled from 'styled-components';

export const LogoInfoStyles = styled.div`
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
`;
