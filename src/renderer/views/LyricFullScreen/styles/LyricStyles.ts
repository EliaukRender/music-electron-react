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
    overflow: auto;
    pointer-events: none; /* 禁止鼠标事件 */
    font-size: 18px;

    &::-webkit-scrollbar {
      display: none;
    }

    /* 每一行歌词的div容器 */

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
`;
