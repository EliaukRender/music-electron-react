import styled from 'styled-components';

export const LyricStyles = styled.div`
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  .lyric-box {
    position: absolute;
    top: 50%;
    transform: translateY(-40%);
    overflow: hidden;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .singer-song {
      padding-bottom: 20px;
      font-size: 26px;
      color: ${(props) => props.theme.textColor.gray_white};
    }

    /* 每一行歌词的div容器 */

    .lyric {
      flex: 1;
      overflow-y: auto;
      pointer-events: none; /* 禁止鼠标事件 */

      &::-webkit-scrollbar {
        display: none;
      }

      .lyric-line {
        white-space: nowrap;
        overflow: hidden;

        .lyric-text {
          height: 40px;
          line-height: 40px;

          display: inline-block;
          text-overflow: ellipsis;
          background: #efefef linear-gradient(to right, #00cc65, #00cc65)
            no-repeat 0 0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 0 100%;
        }
      }
    }
  }
`;
