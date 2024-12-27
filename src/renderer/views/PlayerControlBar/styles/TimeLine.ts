import styled from 'styled-components';

export const TimeLineStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  line-height: 20px;
  margin-top: 3px;

  .time {
    font-size: 12px;
    margin: 0 20px;
  }

  .ant-slider {
    width: 280px;
    margin: 0;

    .ant-slider-handle:focus::after {
      box-shadow: 0 0 0 4px #00cc65;
    }
  }

  .ant-slider:hover .ant-slider-handle::after {
    box-shadow: 0 0 0 2px #00cc65;
  }
`;
