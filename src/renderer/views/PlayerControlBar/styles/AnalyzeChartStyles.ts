import styled from 'styled-components';

export const AnalyzeChartStyles = styled.div`
  .title {
    margin-bottom: 10px;
    font-weight: 600;
  }

  .chart-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .item {
      display: flex;
      flex-wrap: wrap;
      width: 180px;
      height: 150px;
      position: relative;
      box-sizing: border-box;
      margin-right: 15px;
      margin-bottom: 15px;
      cursor: pointer;

      &:nth-child(odd) {
        margin-right: 0;
      }

      .img {
        width: 100%;
        height: 120px;
        border-radius: 10px;
        border: 1px solid #333333;
      }

      .name {
        font-size: 12px;
      }

      .iconfont.icon-duigou1 {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 10px;
        height: 10px;
        color: ${(props) => props.theme.textColor.gray};
      }
    }
  }
`;
