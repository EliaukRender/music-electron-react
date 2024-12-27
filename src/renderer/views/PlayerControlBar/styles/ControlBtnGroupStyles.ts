import styled from 'styled-components';

export const ControlBtnGroupStyles = styled.div`
  .btns {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    .play-pause {
      width: 40px;
      height: 32px;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #00f268;
    }

    .anticon {
      margin: 0 10px;
      padding: 5px;
      font-size: 26px !important;
      cursor: pointer;

      &:hover {
        color: #00cc65;
      }

      svg {
        font-size: 24px;
      }
    }
  }
`;
