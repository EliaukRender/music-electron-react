import styled from 'styled-components';

export const MusicHomeStyles = styled.div`
  height: 100%;
  overflow-y: auto;

  .music-home {
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .main-title {
      font-size: 24px;
      font-weight: 600;
    }

    .body {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .category-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 15px;
        height: 40px;

        .item {
          margin-left: 2px;
          margin-right: 20px;
          cursor: pointer;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }

        .item-selected {
          display: inline-block;
          position: relative;
          color: ${(props) => props.theme.themeColor.hover};

          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -10px;
            width: 100%;
            height: 2px;
            background-color: ${(props) => props.theme.themeColor.hover};
          }
        }
      }
    }
  }
`;
