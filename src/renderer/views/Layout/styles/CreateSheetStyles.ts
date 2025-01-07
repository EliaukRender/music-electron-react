import styled from 'styled-components';

export const CreateSheetStyles = styled.div`
  .create-sheet {
    height: 45px;
    display: flex;
    align-items: center;
    padding-left: 10px;

    .song-pic {
      width: 28px;
      height: 28px;
      margin-right: 5px;
    }

    .input-create-sheet {
      height: 28px;
      padding: 5px;
      border-radius: 0;
      box-sizing: border-box;

      &:focus,
      &:hover {
        border-color: ${({ theme }) => theme.bgcColor.active};
        box-shadow: none;
      }
    }
  }
`;
