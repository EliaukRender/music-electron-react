import http from '@/renderer/api/index';

// 获取自建歌单列表
export const querySheetList = () => {
  return http.post('/music/querySheetList');
};

// 获取自建歌单中的歌曲列表
export const querySongListBySheetId = (params: any) => {
  return http.post('/music/querySongListBySheetId', params);
};

// 获取公共菜单列表
export const queryCommonMenuList = () => {
  return http.post('/music/queryCommonMenuList');
};

// 添加指定歌曲到指定歌单
export const moveSongToSheet = (params: any) => {
  return http.post('/music/moveSongToSheet', params);
};

// 删除指定歌单的指定歌曲
export const deleteSongFromSheet = (params: any) => {
  return http.post('/music/deleteSongFromSheet', params);
};

// 创建自建歌单
export const createSheet = (params: any) => {
  return http.post('/music/createSheet', params);
};

// 删除自建歌单
export const deleteSheet = (params: any) => {
  return http.post('/music/deleteSheet', params);
};

// 获取音乐馆歌单
export const queryMusicHomeSheet = () => {
  return http.post('/music/queryMusicHomeSheet');
};
