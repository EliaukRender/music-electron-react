import styled from 'styled-components';

export const PlayControlBarStyles = styled.div`
  height: 87px;

  .box {
    display: flex;
    justify-content: space-between;
    height: 77px;
    margin-top: 10px;
    border-radius: 6px;
    background-color: ${(props) => props.theme.bgcColor.light_gray_white};

    .left {
      flex: 0.2;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 10px;
    }

    .middle {
      flex: 0.6;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .top {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .right {
      flex: 0.2;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
    }
  }
`;
