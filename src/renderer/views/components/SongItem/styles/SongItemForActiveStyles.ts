import styled from 'styled-components';

export const SongItemForActiveStyles = styled.div`
  min-height: 60px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 6px;
  box-sizing: border-box;

  .operation-group {
    display: flex;
    align-items: center;
    padding-right: 40px;

    .move-music {
      margin-right: 15px;
    }
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
