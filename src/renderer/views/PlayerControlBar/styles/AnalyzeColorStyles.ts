import styled from 'styled-components';

export const AnalyzeColorStyles = styled.div`
  .title {
    margin-bottom: 10px;
    font-weight: 600;
  }

  .colors-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .color-item {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 25px;
      position: relative;
      cursor: pointer;

      .color {
        width: 42px;
        height: 35px;
      }
    }
  }
`;
