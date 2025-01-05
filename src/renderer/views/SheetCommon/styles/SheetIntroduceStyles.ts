import styled from 'styled-components';

export const SheetIntroduceStyles = styled.div`
  height: 120px;

  .sheet-introduce {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;

    .left-img {
      width: 120px;
      height: 120px;
      margin-right: 20px;
    }

    .right-info {
      flex: 1;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      padding: 2px 5px 2px 2px;

      .sheet-name-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .sheet-name {
          font-size: 22px;
          font-weight: 600;
        }

        .edit-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          .icon-bianji {
            margin-right: 5px;
          }
        }
      }

      .operation {
        display: flex;
        justify-content: flex-start;

        .btn {
          width: 90px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border-radius: 16px;
          background-color: #e3e3e3;
          margin-right: 15px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;

          .iconfont {
            color: #000000;
            margin-right: 5px;
          }

          &:hover {
            background-color: #dbdbdb;
          }
        }
      }
    }
`;
