import { ILyric } from '@/renderer/types/Lyric';

/**
 * @description: 转换歌词
 * @return []
 * @param lyricStr  歌词字符串
 */
export const transformLyric = (lyricStr = ''): ILyric[] => {
  if (!lyricStr.trim().length) {
    return [];
  }
  const list = lyricStr.split('\n'); // 分割歌词
  const initList =
    list
      .map((line, index) => {
        // 使用正则表达式匹配时间和歌词部分
        const match = line.match(/^\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);
        if (match) {
          // 将时间转换为秒数
          const minutes = parseInt(match[1], 10);
          const seconds = parseInt(match[2], 10);
          const milliseconds = parseInt(match[3], 10);
          const timeInSeconds = minutes * 60 + seconds + milliseconds / 100;

          return {
            time: Number(timeInSeconds),
            lyric: match[4].trim(), // 去除空格
          };
        }
        return null;
      })
      .filter((obj) => obj !== null) || [];
  return initList.map((item, index) => {
    return {
      ...item,
      /* 额外减去0.2s是为了提前高亮歌词 */
      duration:
        index !== initList.length - 1
          ? initList[index + 1].time - initList[index].time - 0.2
          : 5,
    };
  });
};
