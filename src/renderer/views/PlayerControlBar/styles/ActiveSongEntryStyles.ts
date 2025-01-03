import styled from 'styled-components';

export const ActiveSongEntryStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  margin-left: 20px;
  cursor: pointer;
  overflow: hidden;

  .iconfont.icon-zhankai-show-lyrics {
    color: ${(props) => props.theme.textColor.gray};
  }

  .ant-drawer-body {
    display: flex;
    flex-direction: column;

    .title {
      height: 30px;
      font-size: 14px;
      font-weight: 600;
      box-sizing: border-box;
    }

    .song-list {
      height: calc(100% - 50px);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow-y: auto;
      padding-right: 5px;
    }
  }
`;
