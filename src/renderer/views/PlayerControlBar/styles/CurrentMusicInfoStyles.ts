import styled from 'styled-components';

export const CurrentMusicInfoStyles = styled.div`
  .info-text {
    width: 80px;
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
`;
