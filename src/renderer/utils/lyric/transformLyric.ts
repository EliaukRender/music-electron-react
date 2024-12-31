// @ts-nocheck
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
            startTime: Number(timeInSeconds.toFixed(3)),
            lyric: match[4].trim(), // 去除空格
          };
        }
        return null;
      })
      .filter((obj) => obj !== null) || [];
  console.log('initList', initList);
  const lastList = initList.map((item, index) => {
    const duration = (
      index !== initList.length - 1
        ? initList[index + 1].startTime - initList[index].startTime
        : 5
    ).toFixed(3);
    return {
      ...item,
      duration,
      endTime: item.startTime + Number(duration),
    };
  });
  console.log('lastList', lastList);
  for (let i = 0; i < 6; i++) {
    lastList.push({});
  }
  return lastList;
};
