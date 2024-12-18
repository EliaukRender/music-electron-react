/**
 * @description: 窗口UI通信
 */
enum WindowUIEvent {
  MAX_APP = 'max_app', // 最大化
  MIN_APP = 'min_app', // 最小化
  FULL_APP = 'full_app', // 全屏
  CLOSE_APP = 'close_app', // 关闭窗口

  DRAG_APP = 'drag_app', // 拖拽窗口
}

export default WindowUIEvent;
