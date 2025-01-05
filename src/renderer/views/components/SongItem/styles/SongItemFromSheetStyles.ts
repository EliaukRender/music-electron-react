import styled from 'styled-components';

export const SongItemForSheetStyles = styled.div`
  min-height: 60px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 6px;
  cursor: pointer;

  .music-info {
    flex: 0.25;
  }

  .operation-group {
    flex: 0.25;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 40px;

    .move-music {
      margin-right: 15px;
    }
  }

  .album {
    flex: 0.25;
    text-align: center;
  }

  .duration {
    flex: 0.25;
    text-align: center;
  }

  .odd {
    background-color: #fafafa;
    border-radius: 6px;
  }

  &:hover {
    background-color: #ebebeb;
    border-radius: 6px;
  }

  .active {
    border-radius: 6px;
    background-color: chartreuse;
  }
`;
