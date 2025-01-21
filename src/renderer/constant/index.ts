import { IAnalyzeColor } from '@/types/commonTypes';

/**
 * @description: 频谱图动效样式
 */
export const AnalyzeChartList = [
  {
    id: '1',
    name: '关闭',
    mode: 'none',
    chartImg: require('@/renderer/assets/images/analyzeImage/none.png'),
  },
  {
    id: '2',
    name: '经典',
    mode: 'bars',
    chartImg: require('@/renderer/assets/images/analyzeImage/bars.png'),
  },
  {
    id: '3',
    name: '荧光',
    mode: 'lightBars',
    chartImg: require('@/renderer/assets/images/analyzeImage/lightBars.png'),
  },
  {
    id: '4',
    name: '对称',
    mode: 'doubleBars',
    chartImg: require('@/renderer/assets/images/analyzeImage/doubleBars.png'),
  },
];

/**
 * @description: 频谱图动效颜色
 */

export const AnalyzeColorList: IAnalyzeColor[] = [
  { id: '1', colors: ['#00cc65', '#87f7a2', '#007c39', '#00cc65'] },
  { id: '2', colors: ['#93ba71', '#bed478', '#f0c8d4', '#f8e89b'] },
  { id: '3', colors: ['#84b488', '#bbe1af', '#94d380', '#cae442'] },
  { id: '4', colors: ['#f4b556', '#f5e77e', '#9bbae6', '#e5eef0'] },
  { id: '5', colors: ['#8ab4d2', '#aecfe3', '#dceef4', '#f7f5d6'] },
  { id: '6', colors: ['#EBE6A6', '#FFE5A7', '#FFDB6D', '#FDECCA'] },
  { id: '7', colors: ['#9ADCB5', '#AAE0DD', '#BCE6CA', '#CAECEA'] },
  { id: '8', colors: ['#f779ba', '#ffa5c3', '#ffdcd1', '#ffbfbe'] },
];

/**
 * @description: 公共菜单id枚举
 */
export const MENU_ID_ENUM = {
  MUSIC_HOME: 101,
  VIDEO: 102,
  WORLD: 103,
};

/**
 * @description: 音乐馆页面标题列表
 */
export const MusicHomeSortList = [
  { id: 1, name: '精选', routePath: 'cherryPickCmp' },
  { id: 2, name: '排行', routePath: 'rank' },
  { id: 3, name: '歌手', routePath: 'singer' },
];

/**
 * @description: 视频页面标题列表
 */
export const VideoPageSortList = [
  { id: 5, name: '推荐', routePath: '/videoRecommend' },
  { id: 6, name: '排行榜', routePath: '/videoRecommend' },
  { id: 7, name: '视频库', routePath: '/videoRecommend' },
];

/**
 * @description: 创建歌单时可选的icon
 */
export const addSheetIconList = [
  'icon-gedan',
  'icon-yueliang',
  'icon-xingxing',
  'icon-kuaile',
  'icon-biaoqing',
  'icon-biaoqing1',
  'icon-biaoqing2',
  'icon-fangle',
  'icon-biaoqing4',
];
