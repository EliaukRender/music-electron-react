import styled from 'styled-components';

export const MenuItemStyles = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  cursor: pointer;

  .name {
    margin-left: 10px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.bgcColor.hover};
  }

  .active {
    background-color: ${({ theme }) => theme.bgcColor.active};
  }

  .iconfont {
    color: ${({ theme }) => theme.textColor.light};
  }
`;
