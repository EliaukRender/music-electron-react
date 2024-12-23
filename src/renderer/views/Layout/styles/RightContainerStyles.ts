import styled from 'styled-components';

export const RightContainerStyles = styled.div`
  width: calc(100% - 220px);
  height: 100%;
  padding: 10px 10px 10px 0;

  .container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    //padding: 10px 20px 10px 20px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.bgcColor.light_gray_white};
  }
`;
