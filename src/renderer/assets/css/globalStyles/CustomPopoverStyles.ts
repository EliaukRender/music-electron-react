import { createGlobalStyle } from 'styled-components';

/**
 * 重置antd-Modal组件的样式
 */
export const CustomPopoverStyles = createGlobalStyle`
  /**
   * @description: 音量控制器的popover中的样式
  */
  .volume-adjuster-popover {
    .ant-popover-inner {
      padding: 0;
    }

    .ant-popover-inner-content {
      width: 74px;
      height: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding: 20px 15px 15px 15px;
      box-sizing: border-box;
    }
  }

  /**
   * @description: 音乐播放模式控制器中的popover的样式
  */
  .music-mode-popover {
    cursor: pointer;

    .ant-popover-inner {
      padding: 0;
    }

    .ant-popover-inner-content {
      width: 120px;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 5px;

      .mode-item {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        text-align: center;
        border-bottom: 1px solid #eeeeee;

        .iconfont {
          font-size: 22px;
          margin-right: 8px;
        }

        &:hover {
          background-color: #dddddd;
          border-radius: 5px;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  /**
   * @description: 特色功能FeatListPopover的样式
  */
  .music-feat-popover {
    .ant-popover-inner {
      padding: 0;
    }

    .ant-popover-inner-content {
      width: 180px;
      padding: 10px 0;
      box-sizing: border-box;

      .feat-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 32px;
        padding-left: 15px;
        cursor: pointer;
        font-size: 12px;

        &:hover {
          background-color: #dddddd;
        }

        .iconfont {
          font-size: 22px;
          margin-right: 10px;
        }
      }

      .feat-item-has-arrow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        &:hover {
          background-color: #dddddd;
        }
      }
    }
  }

  /**
   * @description: 倍速播放DoubleSpeed的popover的样式
  */
  .double-speed-popover {
    .ant-popover-inner {
      padding: 0;
    }

    .ant-popover-inner-content {
      width: 160px;
      padding: 10px 0;
      box-sizing: border-box;

      .speed-item {
        height: 30px;
        line-height: 30px;
        text-align: center;
        position: relative;
        cursor: pointer;

        &:hover {
          background-color: #dddddd;
        }

        .icon-duigou {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
        }
      }
    }
  }

  /**
   * @description: 添加音乐到某个列表的浮窗的样式   MoveMusic
  */
  .move-music-popover {
    .ant-popover-inner {
      padding: 0;
    }

    .ant-popover-inner-content {
      width: 160px;
      padding: 10px 0;
      box-sizing: border-box;

      .move-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 30px;
        line-height: 30px;
        text-align: left;
        position: relative;
        padding: 0 24px;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
          background-color: #dddddd;
        }

        .iconfont {
          font-size: 22px;
          margin-right: 10px;
        }
      }
    }
  }

  /**
   * @description: 添加歌单浮窗  add-sheet-popover
  */
  .add-sheet-popover {
    .ant-popover-inner {
      padding: 0;
    }

    .ant-popover-inner-content {
      width: 220px;
      padding: 15px 10px;
      box-sizing: border-box;

      .name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 15px;

        .text {
          flex: 1;
          font-size: 12px;
        }

        .input-sheet-name {
          width: 150px;
          height: 32px;

          .ant-input {
            font-size: 12px;
          }

          &:hover {
            border-color: #82ba77 !important;
            box-shadow: none !important;
          }

          &-focused {
            border-color: #82ba77 !important;
            box-shadow: none !important;
          }
        }
      }

      .list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;

        .iconfont {
          margin: 0 5px 5px 0;
          cursor: pointer;
          padding: 5px;
          font-size: 30px;

          &:hover {
            background-color: #ebebeb;
          }
        }

        .selected {
          color: #00cc65;
          background-color: #ebebeb;
        }
      }

      .btns {
        display: flex;
        justify-content: center;
        margin-top: 10px;

        .ant-btn {
          padding: 10px;
          font-size: 12px;
          height: 28px;
          line-height: 28px;

          &:first-child {
            margin-right: 15px;
          }
        }

        .ant-btn-primary {
          background-color: #00cc65;
        }
      }
    }
  }

  /**
   * @description: ant-popover  所有气泡框中按钮的颜色变为绿色
  */
  .ant-popover {
    .ant-btn-primary {
      background-color: #00cc65;
    }

    .ant-btn-primary:hover {
      background-color: #217367 !important;
    }

    .ant-btn-default:hover {
      color: #00cc65 !important;
      border-color: #00cc65 !important;
    }

    .anticon-exclamation-circle {
      font-size: 16px;
    }
  }

`;
