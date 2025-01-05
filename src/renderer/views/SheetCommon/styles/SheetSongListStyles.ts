import styled from 'styled-components';

export const SheetSongListStyles = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  overflow-y: hidden;

  .bar {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 25px;
    padding-right: 5px;

    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;

      .item {
        margin-right: 20px;
        cursor: pointer;
      }

      .item-active {
        display: inline-block;
        position: relative;
        color: ${({ theme }) => theme.themeColor.hover};

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 100%;
          height: 2px;
          background-color: ${({ theme }) => theme.themeColor.hover};
        }
      }
    }

    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;

      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        line-height: 30px;
        padding: 5px;
        margin-left: 15px;
        cursor: pointer;

        .iconfont {
          margin-right: 5px;
        }

        &:hover {
          background-color: #ebebeb;
          border-right: 8px;
        }
      }
    }
  }

  .song-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-right: 5px;
  }
`;
