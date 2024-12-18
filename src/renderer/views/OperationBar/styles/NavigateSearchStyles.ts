import styled from 'styled-components';

export const NavigateSearchStyles = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .iconfont {
    font-size: 20px;
    cursor: pointer;
    margin-right: 10px;
  }

  .input-box {
    position: relative;

    .input {
      min-width: 180px;
      height: 30px;
      border-radius: 8px;
      border: 1px solid #ccc;
      padding: 0 10px;

      &:focus {
        padding-right: 40px;
        outline: none; /* 去除默认的聚焦外边框 */
        border: 1px solid #4caf50; /* 边框颜色 */
        box-shadow: 0 0 8px rgba(76, 175, 80, 0.6); /* 聚焦时的阴影效果 */
      }
    }

    .icon-sousuo {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      color: #ccc;

      &-nonfocus {
        left: 5px;
      }

      &-focus {
        left: unset;
        right: 5px;
      }
    }
  }
`;
