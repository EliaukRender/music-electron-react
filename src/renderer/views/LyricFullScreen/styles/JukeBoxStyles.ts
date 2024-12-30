import styled from 'styled-components';

export const JukeBoxStyles = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding-right: 50px;

  .box {
    width: 400px;
    height: 400px;
    background-color: #131313;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .outer {
      width: 380px;
      height: 380px;
      background-color: #1f1f1f;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      .inner {
        width: 330px;
        height: 330px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background-color: #979794;
        position: relative;

        .line {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, 50%);
          border: 1px solid #efefef;
          border-radius: 50%;
        }

        .image {
          width: 200px;
          height: 200px;
          border-radius: 50%;
        }
      }
    }
  }
`;
