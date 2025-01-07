import styled from 'styled-components';

export const SearchStyles = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .input-box {
    .search-input {
      &:focus {
        border-color: ${({ theme }) => theme.bgcColor.active};
        box-shadow: none;
      }
    }
  }
`;
