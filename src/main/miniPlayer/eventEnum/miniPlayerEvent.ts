/**
 * 音乐播放器事件枚举
 */
export enum MiniPlayerEventEnum {
  /**
   * 窗口相关的事件
   */
  Show_Hidden_Mini_Player = 'Show_Hidden_Mini_Player', // 显示或者隐藏mini播放器
  Update_Mini_Player_Data = 'Update_Mini_Player_Data', // 更新mini播放器数据
  Update_Mini_Player_Position = 'Update_Mini_Player_Position', // 更新mini窗口位置
  Change_Mini_Player_Height = 'Change_Mini_Player_Height', // 切换窗口的高度

  /**
   * 音乐控制相关的事件
   */
  StartPlay = 'StartPlay', // 播放
  PausePlay = 'PausePlay', // 暂停播放
  PrePlay = 'PrePlay', // 播放上一首
  NextPlay = 'NextPlay', // 播放下一首
  PlayNew = 'PlayNew', // 播放指定歌曲
}
