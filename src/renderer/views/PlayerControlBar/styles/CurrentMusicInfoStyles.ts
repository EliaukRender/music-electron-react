import styled from 'styled-components';

export const CurrentMusicInfoStyles = styled.div`
  .info-text {
    min-width: 60px;
    max-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-right: 15px;

    .singer {
      color: #000000;
      margin-bottom: 5px;
    }

    .song-name {
      color: #626262;
    }
  }

  /* 展示歌词的时候修改样式 */

  .info-text-show-lyrics {
    .singer {
      color: ${(props) => props.theme.textColor.gray_white} !important;
    }

    .song-name {
      color: ${(props) => props.theme.textColor.gray} !important;
    }
  }
`;
