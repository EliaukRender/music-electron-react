import styled from 'styled-components';

export const VolumeSlideStyles = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .volume-slide {
    width: 20px;
    height: 100%;
    position: relative;

    .line {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 3px;
      height: 100%;
      border-radius: 2px;
      background-color: ${(props) => props.theme.bgcColor.active};
    }

    .active-line {
      width: 3px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${(props) => props.theme.themeColor.hover};
    }

    .dot {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 6px);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.themeColor.hover};
    }
  }

  .iconfont {
    font-size: 22px;
    margin-top: 15px;
  }

  .volume-value {
    margin: 10px 0;
  }
`;
