import styled from 'styled-components';

export const MiniPlayerStyles = styled.div`
  .mini-player {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    .transparent {
      width: 100%;
      height: 20px;
      background-color: transparent;
    }

    .header {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      height: 70px;
      background-color: #fff;
      border-radius: 6px 6px 0 0;

      .left {
        padding: 0 15px;

        .img-pic {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          transform: translateY(-20px);
        }
      }

      .right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .info-text {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .name {
            margin-bottom: 5px;
          }
        }
      }
    }

    .song-list {
      width: 100%;
      height: 188px;
      overflow-y: auto;
      border-radius: 0 0 6px 6px;

      &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.bgcColor.light_gray_white};
      }

      .song-item {
        height: 47px;
        line-height: 47px;
        padding: 0 15px;
        background-color: ${({ theme }) => theme.bgcColor.light_gray_white};
      }
    }
  }
`;
