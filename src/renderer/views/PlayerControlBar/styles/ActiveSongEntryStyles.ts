import styled from 'styled-components';

export const ActiveSongEntryStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  overflow-y: auto;
  margin-left: 20px;
  cursor: pointer;

  .title {
    font-weight: 600;
    margin-bottom: 10px;
  }

  .song-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;
