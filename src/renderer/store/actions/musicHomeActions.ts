import { queryMusicHomeSheet } from '@/renderer/api/modules/musicService';

/**
 * @description: 获取音乐馆---精选页面 的歌单
 */
export const handleQueryMusicHomeSheet = async () => {
  try {
    const { data } = await queryMusicHomeSheet();
    return data as any[];
  } catch (e) {
    console.log('error-handleQueryMusicHomeSheet', e);
  }
};
