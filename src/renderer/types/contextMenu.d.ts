// 鼠标右键菜单项
export interface IContextMenuItem {
  label: string;
  icon: string;
  disabled?: boolean;
  onClick: () => void;
}

// 鼠标右键的菜单位置
export interface IContextMenuPosition {
  x: number;
  y: number;
}
