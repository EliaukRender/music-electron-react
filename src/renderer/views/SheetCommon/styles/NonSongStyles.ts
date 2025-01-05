import styled from 'styled-components';

export const NonSongStyles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .iconfont {
    font-size: 120px;
    color: ${({ theme }) => theme.themeColor.active};
  }

  .text {
    color: ${({ theme }) => theme.textColor.normal};
  }
`;
