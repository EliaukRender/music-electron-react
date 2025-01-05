/**
 * @description: 窗口通信事件枚举
 */
enum WindowUIEvent {
  Maximize = 'Maximize', // 最大化
  Minimize = 'Minimize', // 最小化
  Full_Screen = 'Full_Screen', // 全屏
  Close = 'Close', // 关闭窗口
  Set_Position = 'Set_Position', // 更新窗口位置
  Mini_Player = 'Mini_Player',
}

export default WindowUIEvent;
