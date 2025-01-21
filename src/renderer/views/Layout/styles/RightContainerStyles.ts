import styled from 'styled-components';

export const RightContainerStyles = styled.div`
  flex: 1;
  height: 100%;
  padding: 10px 10px 10px 0;
  overflow: hidden;

  .container {
    width: 100%;
    height: calc(100% - 87px); /* 减去底部播放器控制区域高度*/
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.bgcColor.light_gray_white};
  }
`;
