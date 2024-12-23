/**
 * @description: 获取16进制颜色的r、g、b值
 * @return
 * @param hexColor
 */
export const hexToRgb = (hexColor: string) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

/**
 * @description: rgb => 16进制
 * @return
 * @param r
 * @param g
 * @param b
 */
export function rgbToHex(r: number, g: number, b: number) {
  // 将RGB值转换为16进制并返回完整的16进制颜色
  // eslint-disable-next-line no-bitwise
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

/**
 * @description: 16进制颜色 => rgba颜色
 * @return rgba 颜色
 * @param hexColor 16进制的颜色
 * @param alpha
 */
export function hexToRgba(hexColor: string, alpha: number = 1) {
  const { r, g, b } = hexToRgb(hexColor);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * @description: 16进制 => rgb
 * @param hex 16进制颜色
 * @param percentage
 */
export function darkenHexColor(hex: string, percentage: number = 100) {
  const { r, g, b } = hexToRgb(hex);

  // 降低每个通道的亮度
  const darken = (value: number) =>
    Math.max(0, Math.floor(value * (1 - percentage / 100)));

  const newR = darken(r);
  const newG = darken(g);
  const newB = darken(b);

  return rgbToHex(newR, newG, newB);
}
