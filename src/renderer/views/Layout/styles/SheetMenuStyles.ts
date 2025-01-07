import styled from 'styled-components';

export const SheetMenuStyles = styled.div`
  display: flex;
  flex-direction: column;

  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;

    .title {
      font-size: 14px;
      font-weight: 600;
    }

    .iconfont.icon-jia {
      cursor: pointer;
    }
  }
`;
