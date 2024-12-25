// 在线菜单
export interface OnlineMenuItemType {
  createTime: string;
  menuIcon: string;
  menuId: number;
  menuIntro: null;
  menuName: string;
  menuType: MenuTypeEnum.ONLINE;
  routePath: string;
  updateTime: string;
}

// 菜单类型
export enum MenuTypeEnum {
  ONLINE = 0, // 在线菜单
  SHEET = 1, // 歌单菜单
}

// 我的歌单
export interface SheetMenuItemType {
  createTime: string;
  routePath: string;
  sheetCover: string;
  sheetIcon: string;
  sheetId: number;
  sheetInfo: string;
  sheetName: string;
  sheetType: SheetTypeEnum.DEFAULT | SheetTypeEnum.CREATE;
  updateTime: string;
}

// 歌单类型
export enum SheetTypeEnum {
  DEFAULT = 0, // 默认歌单
  CREATE = 1, // 自创歌单
}
