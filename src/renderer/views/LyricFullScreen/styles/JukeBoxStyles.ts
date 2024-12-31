import styled from 'styled-components';

export const JukeBoxStyles = styled.div`
  flex: 1;
  position: relative;

  /* 最外层方形盒子 */
  .juke-box {
    position: absolute;
    top: 50%;
    transform: translateY(-40%);
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background-color: #131313;

    .circle-one {
      width: 90%;
      height: 90%;
      border-radius: 50%;
      background-color: #1f1f1f;

      display: flex;
      justify-content: center;
      align-items: center;

      .circle-two {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 90%;
        height: 90%;
        border-radius: 50%;
        background-color: #979794;

        .image {
          width: 70%;
          height: 70%;
          border-radius: 50%;
        }
      }
    }
  }
`;
