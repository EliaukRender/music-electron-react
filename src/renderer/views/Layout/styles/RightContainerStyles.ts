import styled from 'styled-components';

export const RightContainerStyles = styled.div`
  width: calc(100% - 220px);
  height: 100%;
  padding: 10px 10px 10px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .container {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.bgcColor.light_gray_white};
  }
`;
